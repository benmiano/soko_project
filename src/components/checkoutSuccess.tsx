import React from "react";
import "../styles/checkoutSuccess.css";


// function CheckoutSuccess() {
//     return (
//         <div>
//             <p>YOUR PURCHASE IS SUCCESSFUL. </p>
//             <p>GOODS WILL BE DELIVERED WITHIN 3 - 5 WORKING DAYS</p>

//         </div>
//     )
// }

function CheckoutSuccess() {
    return (
        <div className="mainbox">
            <div className="err">PURCHASE SUCCESSFUL</div>
            <div className="msg">GOODS WILL BE DELIVERED WITHIN 3 - 5 WORKING DAYS
            <p><a href="/">BACK</a></p></div>
        </div>
    )
}


export default CheckoutSuccess;