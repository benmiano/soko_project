import { NextFunction, Request, Response } from "express";
import { authentication } from "../services/authentication";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../server";

// check if token is set || check if server route is authenticated
export const auth = async ( req: Request,
  res: Response,
  next: NextFunction) => {
    let token=req.body.token;
  if (!token) {
    console.log('token required');
    return false;
  } else {
    jwt.verify(token, jwtSecret, function (err: any, decoded: any) {
      if (err) {
        console.log('token not verified');
        return false;
      } else {
        console.log('verified');
        return next();
      } 
    })
    }
};
