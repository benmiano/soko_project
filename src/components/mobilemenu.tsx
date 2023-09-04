import React from "react";
import { Link } from "react-router-dom";
import "../styles/mobilemenu.css";

// menu for small screens
export default function MobileMenu() {
  return (
    <div>
  <select>
    <option>HOME</option>
    <option>CART</option>
    <option>LOGIN</option>
  </select>
</div>
  );
}
