import React from 'react';
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';

import { CatSectionItem } from './../components/components';
import { initObj } from './../mockbase';
import { capitalise } from './../helpers';

export function CartEmpty() {
  return (
    <div id="cart-empty">
      {/* Cart is empty illustration */}
      <div className="img"></div>

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

export function Menu() {
  return <div></div>;
}
export function SignInModal() {
  return <div></div>;
}

export function SnackBar() {
  return <div id="snackbar"></div>;
}
