import jwt from "jsonwebtoken";
import { jwtSecret } from "../server";

export const verifyToken = async (token: string) => {
    if(!token){
        return false;}
        else{
        jwt.verify(token, jwtSecret, function (err, decoded) {
            if(err){
                return false;
            }else {
                return true;
            }
        })
    }
}