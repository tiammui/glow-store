import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faShoppingCart,
  faUserAlt,
  faUserCircle,
  faSignOut
} from '@fortawesome/free-solid-svg-icons';

import { auth } from './../firebase';

import { snack } from './../helpers';
// import {SignInModal} from './bigComponents'

export default function ({
  cartQuantity,
  showMenuHnd,
  showSignInHnd,
  isSignedIn,
}) {
  let navigate = useNavigate();

  function hndSignOut() {
    auth.signOut().then(() => {
      snack("Signed out", 'info')
    });
  }
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
        <div className={`auth-menu ${isSignedIn? 'signed-in':''}`}>
          <button
            className="icon-block cart"
            title={isSignedIn ? '' : 'Sign in / Sign up'}
            onClick={() => {
              isSignedIn ? null : showSignInHnd(true);
            }}
          >
            <FontAwesomeIcon icon={faUserAlt} />
          </button>
          <div className="body">
            <button className="item" onClick={() => navigate('/user')}>
              <FontAwesomeIcon icon={faUserCircle} className="icon" />
              Your Account
            </button>
            <button className="item" onClick={hndSignOut}>
              <FontAwesomeIcon icon={faSignOut} className="icon" />
              Sign out
            </button>
          </div>
        </div>

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
