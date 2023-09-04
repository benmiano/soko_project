import React from "react";
import { Route, Routes } from "react-router-dom";
import Cart from "./cart";
import Home from "./home";
import Login from "./login";
import { ProtectedRoutes } from "./protectedRoutes";
import SignUp from "./signup";
import Verify from "./verify";
import CheckoutSuccess from "./checkoutSuccess";
import NotFound from "./error";

// routes for the web app
const AppRouter = () => {
return (
   <Routes>
    <Route path = "/" element = {<Home/>}/>
    <Route element={<ProtectedRoutes />}>
    <Route path = "/cart" element = {<Cart/>} />
    <Route path = "/checkout-success" element = {<CheckoutSuccess/>} />
      </Route>
    <Route path = "/login" element = {<Login/>}/>
    <Route path = "/signup" element = {<SignUp/>}/>
    <Route path = "/verify" element = {<Verify/>}/>
    <Route path = "*" element = {<NotFound/>} />
   </Routes> 
)
}

export default AppRouter;