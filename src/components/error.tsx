import React from "react";
import "../styles/error.css";

function NotFound() {
    return (
        <div className="mainbox">
            <div className="err">404</div>
            <div className="msg">Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place?
            <p>Let's go <a href="/">home</a> and try from there.</p></div>
        </div>
    )
}

export default NotFound;