import { Request, Response } from "express";
import { registerUser } from "../services/registerService";
import bcrypt from "bcryptjs";

// controller for registering user
export const registerUserController = async (req: Request, res: Response) => {
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber; 
    const password = req.body.password;
    const temporaryHash = await bcrypt.hash(email, 2);
    const result = await registerUser(email, phoneNumber, password, temporaryHash);

    res.status(200).json(result);
    console.log(result);
}