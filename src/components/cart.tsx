import React, { SyntheticEvent, useContext, useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { CartContext } from "../context/cartContext";
import { CartItem } from "../objects/objects";
import "../styles/cart.css"
import { useNavigate } from "react-router-dom";

interface CartContextInterface {
  cart: CartItem[];
  addToCart(id: number): void;
  increase(item: CartItem): void;
  reduce(item: CartItem): void;
  totalItemPrice(item: CartItem): number
  cartPrice(): number;
  removeFromCart(item: CartItem): void
}

// display cart items
function Cart() {
  const cartItems = useContext(CartContext);
  const { cart, totalItemPrice, increase, reduce, cartPrice, removeFromCart }: CartContextInterface = cartItems;

  // submit form details
  const checkout = async () => {
    // try {
    //   let res = await fetch("http://localhost:5000/api/transactions", {
    //     method: "POST",
    //     body: JSON.stringify({
    //       cartList: cart,
    //       total:cartPrice(),
    //       token: localStorage.getItem("token"),
    //     }),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });

    //   let response = await res.json();
    //   console.log(response);
    //   // // if token sent back, set token then redirect to login
    //   // if (response.token) {
    //   //   localStorage.setItem("token", response.token);
    //   // }
    // } catch (error) {
    //   console.log(error);
    // }
    try {
      let res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/create-checkout-session`, {
        method: "POST",
        body: JSON.stringify({
          cartList: cart,
          total: cartPrice(),
          token: localStorage.getItem("token"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let response = await res.json();
      console.log(response.url);
      // if response has url
      if (response.url) {
        window.location.href = response.url;
      } else {
        console.log('could not complete payment');
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <section className="cart">
      <div className="container">
        {cart.map(cartItem => (
          <div className="product" key={cartItem.id}>
            <div className="cartImage"><img src={cartItem.image} alt={cartItem.title} /></div>
            <div className="cartDetails">
              <p>{cartItem.title}</p>
              <p>Price: ${cartItem.price}</p>
            </div>
            <div className="quantityBlock">
              <div className="quantifier">
                <button name="decrease" className="buttonQuantity" onClick={() => reduce(cartItem)}><AiOutlineMinus /></button>
                <p className="quantity">{cartItem.quantity}</p>
                <button name="increase" className="buttonQuantity" onClick={() => increase(cartItem)} ><AiOutlinePlus /></button>
              </div>
              <div className = "deleteButton">
                <button name="remove" className = "remove"onClick={() => removeFromCart(cartItem)}><MdDeleteForever /></button>
              </div>
            </div>

            <div className="itemPrice">
              <p>COST: {totalItemPrice(cartItem)}</p>
            </div>
          </div>
        ))}
        <div className="checkoutButton">
          <button className="checkout" type="submit" onClick={checkout}>PROCEED TO CHECKOUT</button>
        </div>
      </div>

    </section>
  )
}

export default Cart;