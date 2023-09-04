import { Request, Response } from "express";
import { purchase } from "../services/purchases";

// controller for registering user
export const purchaseController = async (req: Request, res: Response) => {
    const cartList = req.body.cartList;
    const total = req.body.total; 
    const token = req.body.token;
    const result = await purchase(cartList, total, token);

    res.status(200).json(result);
    console.log(result);
}