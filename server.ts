import { app } from "./app";
import connectToDB from "./database/db";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import axios from "axios";
import { registerUserController } from "./controllers/registerController";
import { loginUserController } from "./controllers/loginController";
import { authenticationController } from "./controllers/authenticationController";
import express, { Request, Response } from "express";
import { serverTunnel } from "./localtunnel";
import { lipaNaMpesa } from "./services/lipaNaMpesa";
import { auth } from "./services/auth";
import { mpesaController } from "./controllers/mpesaController";
import { purchaseController } from "./controllers/purchaseController";
import Stripe from "stripe";
import { stripeWebhookController } from "./controllers/stripeWebhook";
import { stripeCheckoutController } from "./controllers/stripeCheckout";
import { productsRoute } from "./services/graphSchema";
// import { getTimeStamp } from "./services/timestamp";

const serverport = process.env.S_PORT || 8000;
const dbUrl: string = process.env.DB_URL!;
const stripeKey: string = process.env.STRIPE_KEY!;
export const jwtSecret: string = process.env.JWT_SECRET!;
export const email = process.env.EMAIL ?? "";
export const ePassword = process.env.PASSWORD;
// trigger database connection
connectToDB(dbUrl);

const stripe = new Stripe(stripeKey, {
  apiVersion: '2023-08-16',
});
// graphql endpoint
app.use("/api/graphql", productsRoute);

// register user
app.post("/api/register", registerUserController);

// login route
app.post("/api/login", loginUserController);

// verify token route
app.post("/api/authenticate", authenticationController);

// lipa na mpesa response route
app.get("/api/lipa_na_mpesa",auth, async function (req: Request, res: Response) {
  const result = await lipaNaMpesa(1, 254708374149);
  console.log(result);
  res.send(result);
})

// app.post("/callback", (req:Request, res: Response) => {
//   const callbackData= req.body;
//   console.log(req.body);
// });

app.post("/api/mpesa", mpesaController)

app.post("/api/transactions", auth, purchaseController)

// stripe payment
app.post('/api/create-checkout-session', auth, stripeCheckoutController);

// stripe webhook
app.post('/webhook', stripeWebhookController);


app.listen(serverport, () => {
  // serverTunnel();
  console.log(`⚡️[server]: Server is running at port ${serverport}`);
});
