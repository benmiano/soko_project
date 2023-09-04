import jwt from "jsonwebtoken";
import { jwtSecret } from "../server";
import { PendingUser } from "../models/pendingUser";
import { User } from "../models/users";

// perform verification request of email
export const verifyEmail = async (hash: string) => {

  //   check if user already exists
  const pendingUser = await PendingUser.findOne({ tempHash: hash });
  if (pendingUser) {
    try {
      const newUser = new User({
        email: pendingUser.email,
        phoneNumber: pendingUser.phoneNumber,
        password: pendingUser.password,
      });
      await newUser.save();
      await PendingUser.findOneAndRemove({ email: pendingUser.email });
      const payload = {
        id: newUser._id,
        email: newUser.email,
      };
      const token = jwt.sign(payload, jwtSecret, { expiresIn: 86400 });
      const result = {
        success: true,
        token: token,
        message: "verification successful",
      };
      return result;
    } catch (error) {
      console.log(error);
      const result = {
        success: false,
        token: null,
        message:
          "VERIFICATION FAILED. THIS MAY BE DUE TO A NETWORK PROBLEM. PLEASE TRY AGAIN",
      };
      return result;
    }
  } else {
    console.log("could not verify email. Please try again");
    const result = {
      success: false,
      token: null,
      message:
        "VERIFICATION FAILED. THIS EMAIL MUST NOT HAVE BEEN REGISTERED. PLEASE PROCEED TO THE SIGNUP SECTION",
    };
    return result;
  }
};
