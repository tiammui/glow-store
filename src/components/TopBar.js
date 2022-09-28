import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faShoppingCart, faUserAlt } from '@fortawesome/free-solid-svg-icons';

import { snack } from './../helpers';

export default function ({ cartQuantity, showMenuHnd }) {
  let navigate = useNavigate();
  return (
    <div id="top-bar">
      <button
        className="icon-block"
        onClick={() => {
          showMenuHnd(true);
        }}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <Link to="/" className="logo">
        <img src="https://storage.cloud.google.com/glow-dab38.appspot.com/general/logo_topbar.png?alt=media" alt="logo" />
      </Link>
      <div to="/cart">
        <button
          className="icon-block cart"
          onClick={()=>navigate("/user")}
        >
          <FontAwesomeIcon icon={faUserAlt} />
          <div
            className="cart-dot"
            style={{ visibility: cartQuantity ? 'visible' : 'hidden' }}
          >
            {cartQuantity}
          </div>
        </button>
        <button
          className="icon-block cart"
          onClick={()=>navigate("/cart")}
          // onClick={() => {snack('djdshjhds', 'success')}}
        >
          <FontAwesomeIcon icon={faShoppingCart} />
          <div
            className="cart-dot"
            style={{ visibility: cartQuantity ? 'visible' : 'hidden' }}
          >
            {cartQuantity}
          </div>
        </button>
      </div>
    </div>
  );
}
