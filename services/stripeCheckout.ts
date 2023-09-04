import Stripe from "stripe";
import jwt from 'jsonwebtoken'
import { Item } from "../models/item";


const stripeKey: string = process.env.STRIPE_KEY!;
const stripe = new Stripe(stripeKey, {
    apiVersion: '2023-08-16',
  });

// stripe payment
export const stripeCheckout =async (cart: Item[], token:string, ) => {
    
    // get user's id
    interface JwtPayload {
      id: string;
      email: string
    }
    let decoded = jwt.decode(token, { complete: true })?.payload as JwtPayload;
    let itemsList = cart.map((item:Item) => {
      return {
        itemId: item.id,
        quantity:item.quantity
      }
    })
    const customer = await stripe.customers.create({
      metadata: {
        userId: decoded.id,
        cart: JSON.stringify(itemsList)
      }
    })
  
    const line_items = cart.map((item: Item) => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
            images: [item.image],
            description: item.description,
            metadata: {
              id: item.id
            }
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity
      }
    });
  
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "KE"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "usd",
            },
            display_name: "Free shipping",
            // Delivers between 5-7 business days
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 1500,
              currency: "usd",
            },
            display_name: "Next day air",
            // Delivers in exactly 1 business day
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 1,
              },
            },
          },
        },
      ],
      phone_number_collection: {
        enabled: true,
      },
      customer: customer.id,
      line_items,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });
  
    return ({ url: session.url });
  };