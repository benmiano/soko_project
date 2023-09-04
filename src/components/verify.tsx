import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// redirected from email so as to verify user registration
function Verify() {
  const navigate = useNavigate();
  const hasVerified = useRef(false);
  const windowLocation = window.location.search;
  const verifyParams = new URLSearchParams(windowLocation);
  const hashParam = verifyParams.get("t");

  useEffect(() => {
    async function getVerification() {
      try {
        // if verification is true redirect to home page
        await fetch(`http://localhost:5000/api/verify-email`, {
          method: "POST",
          body: JSON.stringify({ hash: hashParam }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson.message);
            if (responseJson.token) {
              localStorage.setItem("token", responseJson.token);
              navigate("/");
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
    if (hasVerified.current === false) {
      getVerification();
      hasVerified.current = true;
    }
  });

  return (
    <div>
      <p>verification page</p>
    </div>
  );
}
export default Verify;
