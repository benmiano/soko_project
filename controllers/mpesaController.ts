import { Request, Response } from "express";
import { authentication } from "../services/authentication";
import { lipaNaMpesa } from "../services/lipaNaMpesa";

// check if token is set || check if server route is authenticated
export const mpesaController = async (
  req: Request,
  res: Response
) => {
  const phone = req.body.phoneNumber;
  const total = req.body.total;
  const cart = req.body.cart;

  const mpesaPayment = await lipaNaMpesa(total, phone);
  console.log(mpesaPayment);
  if(mpesaPayment.ResponseCode == 0){
    res.json({
      mpesaPaid:true,
      message:"your payment has been processed"
    })
  }else{
    res.json({
      mpesaPaid:false,
      message:"Payment failed. Please try again later"
    })
  }
  // if (mpesaPayment == false) {
  //   res.json({
  //       authenticated: false
  //   })
  // } else {
  //   res.json({
  //       authenticated: true
  //   })
  // }
};
