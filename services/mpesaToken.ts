import dotenv from "dotenv";
import axios from "axios";

dotenv.config({ path: "../.env" });

// generate a Daraja Mpesa Oauth token
export const getOauthToken = async () => {
  // daraja api variables
  const oauthKey = process.env.MPESA_KEY;
  const oauthSecret = process.env.MPESA_SECRET;
  const oauthURL = process.env.OAUTH_URL;

  let buffer = Buffer.from(oauthKey + ":" + oauthSecret).toString("base64");

  // supposed to be the auth field in headers
  let auth = `Basic ${buffer}`;

  try {
    // options for getting mpesa token
    let config = {
      method: "get",
      url: oauthURL,
      headers: {
        Authorization: auth,
      },
    };

    // axios request to get mpesa token
    const tokenResponse = await axios(config);
    const tokenData = tokenResponse.data;

    if (tokenData) {
      return tokenData.access_token;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
