import { Request, Response } from "express";
import { authentication } from "../services/authentication";

// check if token is set || check if server route is authenticated
export const authenticationController = async (
  req: Request,
  res: Response
) => {
  const token = req.body.token;
  const result = await authentication(token);

  if (result == false) {
    res.json({
        authenticated: false
    })
  } else {
    res.json({
        authenticated: true
    })
  }
};
