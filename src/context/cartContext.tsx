import React, { createContext, ReactNode, useEffect, useState } from "react";
import { CartItem, Item } from "../objects/objects";

interface childrenProps {
  children: ReactNode;
}


// provider for cart items
export const CartContext = createContext([] as any);

export const CartProvider = ({ children }: childrenProps) => {
  // cart items array
  let [cart, setCart] = useState<CartItem[]>([]);

  // set cart in local storage
  let localCart: any = localStorage.getItem("cart");

  // add item to cart
  const addToCart = (item: Item) => {

    // create local copy of cart
    let cartCopy = [...cart];
    let existingItem = cartCopy.find(cartItem => cartItem.id === item.id);

    // check if item exists in cart
    if (!existingItem) {
      let cartItem: CartItem = { ...item, quantity: 1 };
      cartCopy.push(cartItem);
      // update cart state
      setCart(cartCopy);
      // store cart in local storage
      let stringCart = JSON.stringify(cartCopy);
      localStorage.setItem("cart", stringCart);
    } else {
      console.log("item is in cart");
    }

  };

  // remove item from cart
  const removeFromCart = (item: Item) => {
    let cartCopy = [...cart];
    cartCopy = cartCopy.filter((cartItem) => cartItem.id !== item.id);
    setCart(cartCopy);

    // store cart in local storage
    let stringCart = JSON.stringify(cartCopy);
    localStorage.setItem("cart", stringCart);
  };

  // increase quantity of item in cart
  const increaseQuantity = (item: CartItem) => {
    let cartCopy = [...cart];
    const cartItem = cartCopy.find(x => x.id === item.id);
    const itemIndex = cartCopy.findIndex(x => x.id === item.id);

    // if item exists add its quantity
    if (cartItem?.quantity === 10) {
      console.log("cannot order more than 10");

    } else if (!cartItem) {
      console.log("Item does not exist in cart");

    } else {
      cartItem.quantity += 1;
      cartCopy[itemIndex] = cartItem;
    }
    return cartCopy;
  }

  //call to increase quantity of item in cart
  function increase(item: CartItem) {
    let updatedCart = increaseQuantity(item);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

  }
  // call to reduceQuantity
  function reduce(item: CartItem) {
    let updatedCart = reduceQuantity(item);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  // reduce quantity of item
  const reduceQuantity = (item: CartItem) => {
    let cartCopy = [...cart];
    const cartItem = cartCopy.find(x => x.id === item.id);
    const itemIndex = cartCopy.findIndex(x => x.id === item.id);

    // if item exists reduce its quantity
    if (!cartItem) {
      console.log("Item does not exist in cart");

    } else if (cartItem.quantity === 1) {
      console.log("minimum quantity reached");

    } else {
      cartItem.quantity -= 1;
      cartCopy[itemIndex] = cartItem;
    }
    return cartCopy;
  }

  // total price of item
  const totalItemPrice = (item:CartItem) => { 
    return (item.quantity * item.price);
  }

  // cost of entire cart
  const cartPrice = () => { 
    return cart.reduce((accumulator, b) => {return accumulator + (b.quantity * b.price)}, 0);

  }

  // set initial state for cart
  useEffect(() => {

    // this persists cart state if it exists in local storage
    if (localCart) {
      setCart(JSON.parse(localCart));
    }
  }, [localCart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, increase, reduce, totalItemPrice, cartPrice, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};