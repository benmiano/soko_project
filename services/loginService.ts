import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../server";

// login user function

import { User } from "../models/users";
import { getOauthToken } from "./mpesaToken";

export const loginUser = async (email: string, password: string) => {
  // check if user with that email exists and compare passwords
  const foundUser = await User.findOne({email: email});
  if (!foundUser) {
    // if no user is found return false
    console.log("invalid email");
    const result = {
      success: false,
      message: "INVALID EMAIL"
    };
    return result;
  } else {
    try {
      let storedPassword : string = foundUser.password!; 
      const correctPassword = await bcrypt.compare(password, storedPassword)
        if(correctPassword){
          // if password is correct create token and send it
          const payload = {
            id: foundUser._id,
            email: foundUser.email
          }
          const token = jwt.sign(payload, jwtSecret, {expiresIn: 86400});
          const result = {
            success: true,
            token: token
          };
          return result;
        }else {
          // if password is incorrect send invalid password
          const result = {
            success: false,
            message: "INVALID PASSWORD"
          };
          return result;
        }
      } catch (error) {
      // return failed if error
      const result = {
        success: false,
        message: "LOGIN FAILED. PLEASE TRY AGAIN"
      };
      return result;
    }
  }
};
