import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingCart,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { nanoid } from 'nanoid';

import { Spacer, SmallProductCard, CartItem, CartCost } from './../components/components';
import { CartEmpty } from './../components/bigComponents';
import { range } from './../helpers';

export default function ({ cart, cartHandler, getProduct }) {
  let navigate = useNavigate()
  useEffect(function () {
    window.scrollTo(0, 0);
    console.log("cart",cart)
  }, []);

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

      {cart.length ? (
        <div>
          <div className="cart-section half">
            <div className="sub-total">
              <p>Cart subtotals = <CartCost cart={cart} getProduct={getProduct} /></p>
              <p className="warning">
                * &nbsp;&nbsp;Delivery fee is not included yet
              </p>
            </div>

            <div className="cart-item-con">
              {cart.map((item) => (
                <CartItem key={nanoid()} cartHandler={cartHandler} cartItem={item} getProduct={getProduct} />
              ))}
            </div>

            <div className="checkout-btn-con">
              <button className="serious-btn" title="checkout" onClick={()=>{navigate('/checkout')}}>
                Checkout (<CartCost cart={cart} getProduct={getProduct} />){' '}
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
          <div className="free-section half"></div>
        </div>
      ) : (
        <CartEmpty />
      )}
      <div className="clear-fix"></div>

      <h3>Trending Products</h3>
      <div className="carousel product-card-small-con">
        <ul>
          {range(10).map(() => (
            <SmallProductCard productId="100001" key={nanoid()} getProduct={getProduct} />
          ))}
        </ul>
      </div>
    </div>
  );
}
