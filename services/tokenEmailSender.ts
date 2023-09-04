import nodemailer from "nodemailer";
import { ePassword, email } from "../server";

const senderEmail = email;
const senderpass = ePassword;

// function for sending email
export const sendConfirmationEmail = (temporaryUserHash: string) => {
  // transporter to send email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: senderEmail,
      pass: senderpass,
    },
  });

  const mailConfigurations = {
    from: senderEmail,
    to: senderEmail,
    subject: "Account Activation",
    html: `Hi! There, You have recently visited\n our website and entered your email. \n Please follow the given link to verify your email\n http://localhost:3000/verify?t=${temporaryUserHash} Thank you`,
  };

  transporter.sendMail(mailConfigurations, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(info.response);
    }
  });
};
