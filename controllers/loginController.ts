import { Request, Response } from "express";
import { loginUser } from "../services/loginService";

// controller for logging in
export const loginUserController = async (req: Request, res: Response) => {
const email = req.body.email;
const password = req.body.password;
const result = await loginUser(email, password);

res.status(200).json(result);
}