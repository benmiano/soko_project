import { Request, Response } from "express";
import { verifyEmail } from "../services/verifyEmail";

// check if email is verified
export const verifyEmailController = async (req: Request, res: Response) => {
    const hash = req.body.hash;
    const result = await verifyEmail(hash);

        res.status(201).json(result);
}