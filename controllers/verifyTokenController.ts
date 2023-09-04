import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../services/verifyToken";

// check if token is set || check if server route is authenticated
export const verifyTokenController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.body.token;
  const result = await verifyToken(token);

  if (result == false) {
    console.log("not authenticated");
  } else {
    next();
  }
};
