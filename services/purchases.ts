import jwt from 'jsonwebtoken'
import { CartItem, Item } from "../models/item";
import { jwtSecret } from '../server';
import { Purchase } from '../models/purchase';

// save purchase

export const purchase = async (cartList: Item[], total: number, token: string) => {
    // save purchases  
    let newList: CartItem[] = [];
    // get user's id
    interface JwtPayload {
        id: string;
        email: string
    }
    let decoded = jwt.decode(token, { complete: true })?.payload as JwtPayload;

    cartList.forEach(element => {
        let newItem: CartItem = {
            id: element.id,
            quantity: element.quantity
        }
        newList.push(newItem);
    });

    // cartList.map((item: CartItem) => {
    //     let newItem: CartItem = {
    //         id: item.id,
    //         quantity: item.quantity
    //     }
    //     purchaseList.push(newItem)
    // });


    let price = total;
    const newPurchase = new Purchase({
        items: newList,
        price: price,
        buyer: decoded.id
    })
    try {
        let transaction = await newPurchase.save();
        if (transaction) {
            const result = {
                success: true,
                message: "PURCHASE SUCCESSFUL",
            };
            return result;
        }
        else {
            const result = {
                success: false,
                message: "THERE WAS A PROBLEM WITH YOUR PURCHASE. PLEASE TRY AGAIN"
            };
            return result;
        }
    } catch (error) {
        const result = {
            success: false,
            message: "COULD NOT SET PURCHASE. PLEASE TRY AGAIN"
        };
        return result;
    }

};
