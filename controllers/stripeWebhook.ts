import { Request, Response } from "express";
import Stripe from "stripe";
import { Purchase } from "../models/purchase";


const stripeKey: string = process.env.STRIPE_KEY!;
const stripe = new Stripe(stripeKey, {
    apiVersion: '2023-08-16',
});


// create order
const createOrder = async (customer: any, data: any) => {
    const items = JSON.parse(customer.metadata.cart);
    const newPurchase = new Purchase({
        items: items,
        price: data.amount_subtotal,
        shipping: data.customer_details,
        payment_status: data.payment_status,
        total: data.amount_total,
        userId: customer.metadata.userId,
        customerId: data.customer,
        paymentIntentId: data.payment_intent
    })
    try {
        const savedPurchase = await newPurchase.save();
        console.log('processed order: ', savedPurchase);
    } catch (error) {
        console.log(error);
    }
}


export const stripeWebhookController = async (
    req: Request,
    res: Response
) => {

    const sig = req.headers['stripe-signature'];
    let endpointSecret;
    let data: any;
    let eventType;

    if (endpointSecret) {
        let event;
        try {
            event = stripe.webhooks.constructEvent(req.body, sig!, endpointSecret);
            console.log("webhook verified");
        } catch (err: any) {
            res.status(400).send(`Webhook Error: ${err.message}`);
            console.log(`Webhook Error: ${err.message}`);
            return;
        }
        data = event.data.object;
        eventType = event.type;
    } else {
        data = req.body.data.object;
        eventType = req.body.type;
    }
    // handle the event
    if (eventType === "checkout.session.completed") {
        stripe.customers.retrieve(data.customer)
            .then((customer) => {
                createOrder(customer, data);
            })
            .catch(err => console.log(err.message));
    }
    // Return a 200 response to acknowledge receipt of the event
    res.send().end();
};