import axios from "axios";
import { serverTunnel } from "../localtunnel";
import { getTimeStamp } from "./timestamp";
import { getOauthToken } from "./mpesaToken";

// initiate lipa na mpesa function
export const lipaNaMpesa = async (amount: number, sender: number) => {
  let token = await getOauthToken();
  let auth = `Bearer ${token}`;
  let bs_short_code = process.env.BS_SHORT_CODE;
  let passkey = process.env.PASSKEY;
  let timestamp = getTimeStamp();
  let lipaNaMpesaUrl = process.env.LIPA_NA_MPESA_URL;
  let password = Buffer.from(`${bs_short_code}${passkey}${timestamp}`).toString('base64');
  let transactionType = process.env.TRANSACTION_TYPE;
  let tunnelUrl = await serverTunnel();
  let lipaNaMpesaCallback = `${tunnelUrl}/callback`;
  let accountReference = process.env.ACCOUNT_REFERENCE;
  let transactionDesc = process.env.TRANSACTION_DESCRIPTION;

  try {
  // variable details
  let data = JSON.stringify({
    "BusinessShortCode": bs_short_code,
    "Password": password,
    "Timestamp": timestamp,
    "TransactionType": transactionType,
    "Amount": amount,
    "PartyA": sender,
    "PartyB": bs_short_code,
    "PhoneNumber": sender,
    "CallBackURL": lipaNaMpesaCallback,
    "AccountReference": accountReference,
    "TransactionDesc": transactionDesc
  });

  let config = {
    method: 'post',
    url: lipaNaMpesaUrl,
    headers: {
      'Authorization': auth,
      'Content-Type': 'application/json'
    },
    data: data
  };
 
    const response = await axios(config);
    const responseData = response.data;
    return responseData;
  } catch (error: any) {
    console.log(error.message);
    return error.message;
  }

}
