import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import MobileMenu from "./mobilemenu";
import { AiOutlineShoppingCart, AiOutlineHome } from "react-icons/ai";
import { BiSolidUserRectangle } from "react-icons/bi";
import { AuthenticationContext } from "../context/authenticationContext";

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    // <div>
    //   <nav>
    //     <div className="flex-container">
    //       <div>
    //         <a
    //           href="/"
    //         >
    //           AMAZONE
    //         </a>
    //       </div>
    //       <div>
    //         <ul className="inline-block">
    //           <li><Link to = "cart">CART</Link></li>
    //           <li>USER</li>
    //           <li>SETTINGS</li>
    //           <li><Link to = "login">LOGIN</Link></li>
    //         </ul>
    //       </div>
    //       <div>
    //         <MobileMenu />
    //       </div>
    //     </div>
    //   </nav>
    // </div>
    <nav className="topnav">
      <a className="active" href="/"><AiOutlineHome size={40} />SOKO</a>

      <div className="topnav-right">
        <div>
        {/* <a href="/login" className="profile"><BiSolidUserRectangle size={40} /></a> */}
        <div className="dropdown">
  <BiSolidUserRectangle size={40} />
  <div className="dropdown-content">
    <a href="/login">LOGIN</a>
    <a href="/signup">SIGN UP</a>
    <button onClick={ ()=> logout()}>LOGOUT</button>
  </div>
</div>

        </div>
        <div>
        <a href="/cart"><AiOutlineShoppingCart size={40} /></a>
        </div>
        </div>

    </nav>
  );
}
