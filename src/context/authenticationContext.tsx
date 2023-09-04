import React, { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface childrenProps {
  children: ReactNode;
}

// check for authentication / logged in status
export const AuthenticationContext = createContext<any>(null);

export const AuthenticationProvider = ({ children }: childrenProps) => {
  let [loggedIn, setLoggedIn] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  // function to verify token by sending token to server endpoint
  async function checkAuthentication() {
    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/authenticate`, {
        method: "POST",
        body: JSON.stringify({
          token: localStorage.getItem("token"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((response) => {
          setLoggedIn(response.authenticated)})
          .then(() => setIsLoading(false));
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }


  useEffect(() => {
      checkAuthentication();
    console.log(loggedIn);
  }, []);

  return (
    <AuthenticationContext.Provider value={{loggedIn, isLoading}}>
      {children}
    </AuthenticationContext.Provider>
  );
};
