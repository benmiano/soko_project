import jwt from "jsonwebtoken";
import { jwtSecret } from "../server";
import { NextFunction, Request, Response } from "express";

// check if request from frontend is authenticated
export const authentication = async (token: string) => {
  if (!token) {
    console.log('token required');
    return false;
  } else {
    jwt.verify(token, jwtSecret, function (err, decoded) {
      if (err) {
        console.log('token not verified');
        return false;
      } else {
        console.log('verified');
        return true;
      }
    });
  }
};

