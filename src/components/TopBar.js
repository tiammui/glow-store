import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { snack } from './../helpers';

export default function ({ cartQuantity }) {
  let navigate = useNavigate();
  return (
    <div id="top-bar">
      <button
        className="icon-block"
        onClick={() => {
          navigate('/contacts');
        }}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <Link to="/" className="logo"></Link>
      <Link to="/cart">
        <button
          className="icon-block cart"
          onClick={() => {snack('djdshjhds', 'success')}}
        >
          <FontAwesomeIcon icon={faShoppingCart} />
          <div
            className="cart-dot"
            style={{ visibility: cartQuantity ? 'visible' : 'hidden' }}
          >
            {cartQuantity}
          </div>
        </button>
      </Link>
    </div>
  );
}
