import React from "react";
import "./App.css";
import Navbar from "./components/navbar";
import AppRouter from "./components/routes";

function App() {
  return (
    <div className="App">
      <div className="navbar">
        <Navbar />
      </div>
      <div>
        <AppRouter />
      </div>
    </div>
  );
}

export default App;
