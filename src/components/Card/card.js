import React from 'react';
import { Link } from 'react-router-dom';
import './card.css';

const Card = ({ icon, title, to }) => {
  return (
    <Link to={to} className="card-home">
      <i className={icon}></i>
      <h3>{title}</h3>
    </Link>
  );
};

export default Card;