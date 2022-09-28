import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faShoppingCart,
  faUserAlt,
} from '@fortawesome/free-solid-svg-icons';

import { snack } from './../helpers';
// import {SignInModal} from './bigComponents'

export default function ({
  cartQuantity,
  showMenuHnd,
  showSignInHnd,
  isSignedIn,
}) {
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
        <img
          src="https://storage.cloud.google.com/glow-dab38.appspot.com/general/logo_topbar.png?alt=media"
          alt="logo"
        />
      </Link>
      <div>
        <button
          className="icon-block cart"
          style={
            isSignedIn
              ? {
                  color: 'var(--color-serious)',
                  border: 'solid 2px',
                  borderRadius: '50%',
                }
              : {}
          }
          onClick={() => {
            isSignedIn ? navigate('/user') : showSignInHnd(true);
          }}
        >
          <FontAwesomeIcon icon={faUserAlt} />
        </button>

        <button
          className="icon-block cart"
          onClick={() => navigate('/cart')}
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
