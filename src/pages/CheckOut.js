import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyCheck } from '@fortawesome/free-solid-svg-icons';
import { nanoid } from 'nanoid';
import { PaystackButton } from 'react-paystack';

import { Spacer } from './../components/components';
import {
  capitalise,
  getCurrentUser,
  formatAddress,
  cartCost,
  cartItemCost,
  getProduct,
  getDeliveryFee,
  getDeliveryCity,
} from './../helpers';
import { OrderMaker } from './../mockbase';

export default function ({ cart }) {
  let navigate = useNavigate();
  let userInfo = getCurrentUser();
  let [orderForm, setOrderForm] = useState({
    ...userInfo.address,
    ...userInfo.contact,
    name: `${userInfo.lastname} ${userInfo.firstname}`,
  });
  const componentProps = {
    email: 'tiammui@gmail.com',
    amount: 1000,
    metadata: {
      name: 'Muisc',
      phone: '08083524016',
    }, // can contain stringified OrderMaker object
    publicKey: 'pk_test_8ae9b5e5e2ab00f462acab267d072b69217fa3f1',
    text: 'Pay Now',
    onSuccess: (ref) => {
      alert('Thanks for doing business with us! Come back soon!! ');

      console.log(ref);
    },
    onClose: () => alert("Wait! You need this oil, don't go!!!!"),
  };

  useEffect(function () {
    window.scrollTo(0, 0);
    if (!cart.length) {
      // if no item in cart to checkout go to Cart page
      navigate('/cart');
    }
  }, []);

  function handleInput(e) {
    let { name, value } = e.target;

    setOrderForm((prev) => ({ ...prev, [name]: value }));
  }
  function placeOrder() {
    let order = new OrderMaker();

    // initiate payment, verify payment, send order and clear cart
  }
  return (
    <div id="checkout">
      <h2>
        <FontAwesomeIcon
          icon={faMoneyCheck}
          style={{ color: 'var( --color-dark-light-primary)' }}
        />{' '}
        <Spacer space="5" />
        Checkout and Payment
      </h2>

      <div>
        <div className="half">
          <div className="section">
            <h3>Contact details</h3>
            <div className="input">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={orderForm.name}
                onInput={handleInput}
              />
            </div>
            <div className="input">
              <label htmlFor="email">Email (can't be changed)</label>
              <input
                type="text"
                id="email"
                name="email"
                value={orderForm.email}
                onInput={handleInput}
              />
            </div>
            <div className="input">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={orderForm.phoneNumber}
                onInput={handleInput}
              />
            </div>
          </div>
          <div className="serious-warning">
            Please provide correct info, to enable us reach you for your
            delivery
          </div>

          <Spacer axis="y" space={40} />

          <div id="order-address" className="section">
            <h3>Delivery details</h3>
            <div className="input">
              <label htmlFor="country">Country</label>
              <select
                type="text"
                id="country"
                name="country"
                value={orderForm.country}
                onInput={handleInput}
              >
                <option value="">-- Choose country</option>
                <option value="nigeria">Nigeria</option>
              </select>
            </div>
            <div className="input">
              <label htmlFor="state">State</label>
              <select
                type="text"
                id="state"
                name="state"
                value={orderForm.state}
                onInput={handleInput}
              >
                <option value="">-- Choose state</option>
                <option value="lagos">Lagos</option>
              </select>
            </div>
            <div className="input">
              <label htmlFor="city">City</label>
              <select
                type="text"
                id="city"
                name="city"
                value={orderForm.city}
                onInput={handleInput}
              >
                <option value="">-- Choose city</option>
                {getDeliveryCity(orderForm.state, orderForm.country).map(
                  (city) => (
                    <option key={nanoid()} value={city}>
                      {capitalise(city)}
                    </option>
                  )
                )}
                {/* <option value="ikeja">Ikeja</option>
                <option value="yaba">Yaba</option>
                <option value="ikorodu">Ikorodu</option>
                <option value="oshodi">Oshodi</option> */}
              </select>
            </div>
            <div className="input">
              <label htmlFor="street">Street Address</label>
              <input
                type="text"
                id="street"
                name="street"
                value={orderForm.street}
                onInput={handleInput}
              />
            </div>
            <div className="input">
              <label htmlFor="note">Order Note</label>
              <textarea
                type="text"
                id="note"
                name="note"
                value={orderForm.note}
                onInput={handleInput}
                rows={3}
              />
            </div>
          </div>

          <Spacer axis="y" space={40} />
        </div>

        <div className="half">
          <div className="section">
            <h3>Your order summary</h3>
            <table>
              <tr className="head">
                <td>Products</td>
                <td>Cost</td>
              </tr>
              {cart.map((item) => (
                <tr key={nanoid()} className="body">
                  <td>
                    <span>
                      {getProduct(item.productId).name} X <b>{item.quantity}</b>{' '}
                    </span>
                  </td>
                  <td>₦{cartItemCost(item)}</td>
                </tr>
              ))}
              <tr className="foot">
                <td>Cart Subtotal</td>
                <td>₦{cartCost(cart)}</td>
              </tr>
              <tr className="foot">
                <td>Deliver fee**</td>
                <td>
                  ₦
                  {getDeliveryFee(
                    orderForm.city,
                    orderForm.state,
                    orderForm.country
                  )}
                </td>
              </tr>
              <tr className="foot">
                <td>TOTAL</td>
                <td>
                  ₦
                  {cartCost(cart) +
                    getDeliveryFee(
                      orderForm.city,
                      orderForm.state,
                      orderForm.country
                    )}
                </td>
              </tr>
            </table>
            <p>
              To be delivered to{' '}
              <b>
                {' '}
                {formatAddress(
                  orderForm.street,
                  orderForm.city,
                  orderForm.state,
                  orderForm.country
                )}
              </b>
            </p>
            <a href="#order-address">change address</a>
          </div>
          <div className="serious-warning">
            ** The delivery fee is determined by the address provided in the{' '}
            <em>Delivery details</em> section
          </div>

          <div className="paystack"></div>

          <PaystackButton className="" {...componentProps} />

          <div className="order-btn-con">
            <button className="serious-btn" title="place order">
              Place Order
            </button>
          </div>
        </div>

        <div className="clear-fix"></div>
      </div>
    </div>
  );
}
