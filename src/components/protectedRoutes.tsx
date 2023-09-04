import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthenticationContext } from "../context/authenticationContext";
import Loading from "./loading";

// if user is loggd in allow access to private routes else redirect to login
export const ProtectedRoutes = () => {
  const authentication = useContext(AuthenticationContext);
  const {loggedIn, isLoading }= authentication;
  
  return !isLoading ? (
   loggedIn ? <Outlet /> : <Navigate to="/login" />
  ):
  < Loading/>;
};
