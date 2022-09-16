import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingCart,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { nanoid } from 'nanoid';

import {
  ProductPrice,
  Spacer,
  SmallProductCard,
  CartItem,
} from './../components/components';
import { cartCost, cartItemCost, range } from './../helpers';

export default function ({ cart, cartHandler }) {
  return (
    <div id="cart">
      <h2>
        <FontAwesomeIcon
          icon={faShoppingCart}
          style={{ color: 'var( --color-dark-light-primary)' }}
        />{' '}
        <Spacer space="5" />
        Cart
      </h2>
      <div>
        <div className="cart-section half">
          <div className="sub-total">
            <p>Cart subtotals = ₦{cartCost(cart)}</p>
            <p className="warning">
              * &nbsp;&nbsp;Delivery fee is not included yet
            </p>
          </div>

          <div className="cart-item-con">
            {cart.map((item) => (
              <CartItem cartHandler={cartHandler} cartItem={item} />
            ))}
          </div>

          <div className="checkout-btn-con">
            <button className="serious-btn">
              Checkout (₦{cartCost(cart)}){' '}
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
        <div className="free-section half"></div>
      </div>
      <div className="clear-fix"></div>
      <h3>Trending Products</h3>
      <div className="carousel product-card-small-con">
        <ul>
          {range(10).map(() => (
            <SmallProductCard key={nanoid()} />
          ))}
        </ul>
      </div>
    </div>
  );
}
