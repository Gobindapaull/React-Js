import React from "react";

const Child = () => {
  let transactions = [
    { amount: 500, desc: "Cash" },
    { amount: -300, desc: "Phone" },
    { amount: -100, desc: "Book" },
  ];

  return (
    <div className="container">     
      <ul className="tx-list">
        {transactions.map((txObj) => {
          return (<li>
            <span>{txObj.desc}</span>
            <span>${txObj.amount}</span>
          </li>);
        })}
      </ul>
    </div>
  );
};

export default Child;
