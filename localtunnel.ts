import localtunnel from "localtunnel";
import dotenv from "dotenv";

dotenv.config();
const port:any = process.env.PORT || 8000;
// make localhost publicly available for purposes of testing
export const serverTunnel = async () => {
const tunnel = await localtunnel({port: port});
console.log(tunnel.url);
return tunnel.url;

}