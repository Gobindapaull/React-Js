import React, { useState } from "react";
import "./LoginSignup.css";

import amount from "../Assets/amount.png";
import address from "../Assets/address.png";

const LoginSignup = () => {
  const [action, setAction] = useState("SELL");
  return (
    <div className="container">
      {/* div: sign up */}
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      {/* div: inputs Name, amount Id, address*/}
      <div className="inputs">

        <div className="input">
          <img src={amount} alt="amount" className="amount" />
          <input placeholder="amount" />
        </div>
        <div className="input">
          <img src={address} alt="address" className="address" />
          <input placeholder="Address" />
        </div>
      </div>


      {/* div: submit button */}
      <div className="submit-container">
        <div
          className={action === "SELL" ? "submit gray" : "submit"}
          onClick={() => setAction("BUY")}
        >
         BUY TOKEN
        </div>
        <div
          className={action === "BUY" ? "submit gray" : "submit"}
          onClick={() => setAction("SELL")}
        >
          SELL TOKEN
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
