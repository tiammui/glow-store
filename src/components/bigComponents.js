import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { nanoid } from 'nanoid';

import { CatSectionItem } from './../components/components';
import { initObj } from './../mockbase';
import { capitalise } from './../helpers';

export function CartEmpty() {
  return (
    <div id="cart-empty">
      {/* Cart is empty illustration */}
      <img src="https://storage.cloud.google.com/glow-dab38.appspot.com/general/empty_cart.jpg?alt=media" />

      <p className="message"> No item in cart</p>

      <h3>Start shopping by categories</h3>
      <div className="carousel cat-section">
        <ul>
          {initObj.productCategories.map((cat) => (
            <CatSectionItem category={capitalise(cat)} key={nanoid()} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export function SignInModal({ uiConfig, showSignIn, showSignInHnd, auth }) {
  return (
    <div id="sign-in-modal" className={`modal ${showSignIn ? ' show' : ''}`}>
      <div className="content">
        <p>
          <button
          onClick={()=>showSignInHnd(false)}
          >Close</button>
        </p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      </div>
    </div>
  );
}

export function SnackBar() {
  return <div id="snackbar"></div>;
}
