import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ItemsProvider } from "./context/itemsContext";
import { CartProvider } from "./context/cartContext";
import { BrowserRouter } from "react-router-dom";
import { AuthenticationProvider } from "./context/authenticationContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthenticationProvider>
      <CartProvider>
        <ItemsProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ItemsProvider>
      </CartProvider>
    </AuthenticationProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
