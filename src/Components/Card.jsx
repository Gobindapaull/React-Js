import React from "react";
import "./Card.css";

const Card = ({
    imgSrc,
    imgAlt,
    title,
    description,
    buttonText,
    link
}) => {
  return (
    <div className="card-container">
      <img
        src={imgSrc}
        alt={imgAlt}
        className="card-img"
      />
      <h3 className="card-title">{title}</h3>
      <p className="card-description">
        {description}
      </p>
      <a href={link} className="card-btn">
        {buttonText}
      </a>
      <a className="card-btn">MINT</a>
    </div>
  );
};

export default Card;
