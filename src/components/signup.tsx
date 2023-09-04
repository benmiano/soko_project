import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/signup.css";


function SignUp() {
  const navigate = useNavigate();
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [phoneNumber, setPhoneNumber ] = useState('');

  // set email input on change
  function handleEmailChange(event : ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }
   // set password input on change
   function handlePasswordChange(event : ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }
   // set phone number input on change
   function handlePhoneNumberChange(event : ChangeEvent<HTMLInputElement>) {
    setPhoneNumber(event.target.value);
  }

  // submit form details
  const handleSubmit = async (event : SyntheticEvent) => {
    event.preventDefault();

    try {
      let res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/register`, {
        method : "POST",
        body : JSON.stringify({
          email : email,
          phoneNumber : phoneNumber,
          password: password
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      let response = await res.json();
      console.log(response);
      if (response.token){
        console.log(response.token);
        localStorage.setItem("token", response.token);
        navigate("/");
      }
    } catch (error) {
    console.log(error)
    }
  }

  return (
    <div className="signupComponent">
      <div>
        <h1>
          REGISTER
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              name = "email" value = {email} onChange = {handleEmailChange}/>
          </div>
          <div>
            <label
              htmlFor="phone number"
            >
              Phone Number
            </label>
            <input
              type="tel"
              name = "phoneNumber" value = {phoneNumber} onChange = {handlePhoneNumberChange}/>
          </div>
          <div>
            <label
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              name = "password" value = {password} onChange = {handlePasswordChange}/>
          </div>
          <div>
            <button type = "submit">
              REGISTER
            </button>
          </div>
        </form>
      </div>
    </div>
    
  );
}

export default SignUp;
