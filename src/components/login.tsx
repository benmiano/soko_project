import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";

// login form. If logged in redirect to home
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // set email input on change
  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }
  // set password input on change
  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  // submit form details
  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    try {
      let res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/login`, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let response = await res.json();
      // if token sent back, set token then redirect to login
      if (response.token) {
        localStorage.setItem("token", response.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="loginComponent">
      <div>
        <h1>LOGIN</h1>
        <form onSubmit={handleSubmit}>
          {/* email div */}
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange = {handleEmailChange}
            />
          </div>

          {/* password div */}
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange = {handlePasswordChange}
            />
          </div>
          <a href="#">
            Forget Password?
          </a>
          <div>
            <button type = "submit">
              LOGIN
            </button>
          </div>
        </form>

        <div>
            <Link to="/signup">
            <p>
            Don't have an account?
                SIGN UP
              </p>
            </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
