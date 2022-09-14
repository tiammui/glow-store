import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faShoppingCart } from '@fortawesome/free-solid-svg-icons';


export default function () {
  return (
    <div id="top-bar">
        <button className="icon-block" >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className="logo"></div>
        <Link to="/cart" >
          <button className="icon-block cart" >
            <FontAwesomeIcon icon={faShoppingCart} />
            <div className="cart-dot">3</div>
          </button>
        </Link>
    </div>
  );
}
