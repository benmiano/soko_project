import { Request, Response } from "express";
import { stripeCheckout } from "../services/stripeCheckout";

// stripe checkout
export const stripeCheckoutController = async (
  req: Request,
  res: Response
) => {
  const token = req.body.token;
  const cart = req.body.cartList;
  const result = await stripeCheckout(cart, token);

  res.status(201).json(result); 
};
