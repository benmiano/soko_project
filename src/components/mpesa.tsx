import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";

// send mpesa stk push
function MpesaPay() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [total, setTotal] = useState("");
  const [finalCart, setFinalCart] = useState("");

  // set email input on change
//   function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
//     setEmail(event.target.value);
//   }

  // submit mpesa payment details
  const sendSTKPush = async (event: SyntheticEvent) => {
    event.preventDefault();

    try {
      let res = await fetch("http://localhost:5000/api/mpesa", {
        method: "POST",
        body: JSON.stringify({
          phoneNumber: phoneNumber,
          total: total,
          cart: finalCart
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let response = await res.json();
      // if token sent back, set token then redirect to login
      if (response) {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>
        <h1>MPESA</h1>
        <form onSubmit={sendSTKPush}>
          {/* email div */}
          <div>
            <label htmlFor="phone">phone</label>
            <p>{phoneNumber}</p>
          </div>

          {/* password div */}
          <div>
            <label htmlFor="total">Total</label>
            <p>{total}</p>
          </div>
          
          <div>
            <button type = "submit">
              PAY
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default MpesaPay;
