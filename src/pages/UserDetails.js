import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { nanoid } from 'nanoid';

import { getCurrentUser, getUserOrders } from './../helpers';

import { Spacer, OrderCard } from './../components/components';

export default function () {
  let navigate = useNavigate();
  let userInfo = getCurrentUser();
  let [userForm, setUserForm] = useState({
    ...userInfo.address,
    ...userInfo.contact,
    firstname: userInfo.firstname,
    lastname: userInfo.lastname,
  });

  useEffect(function () {
    window.scrollTo(0, 0);
  }, []);

  function handleInput(e) {
    let { name, value } = e.target;

    setUserForm((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div id="user-details">
      <h2>
        <FontAwesomeIcon
          icon={faUser}
          style={{ color: 'var( --color-dark-light-primary)' }}
        />{' '}
        <Spacer space="5" />
        Your Account
      </h2>

      <div>
        <div className="half">
          <form className="section">
            <div className="input">
              <label htmlFor="firstname">Firstname</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={userForm.firstname}
                onInput={handleInput}
              />
            </div>
            <div className="input">
              <label htmlFor="lastname">Lastname</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={userForm.lastname}
                onInput={handleInput}
              />
            </div>
            <div className="input">
              <label htmlFor="email">Email (can't be changed)</label>
              <input
                type="text"
                id="email"
                name="email"
                value={userForm.email}
                onInput={handleInput}
              />
            </div>
            <div className="input">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={userForm.phoneNumber}
                onInput={handleInput}
              />
            </div>

            <div className="input">
              <label htmlFor="street">Street Address</label>
              <input
                type="text"
                id="street"
                name="street"
                value={userForm.street}
                onInput={handleInput}
              />
            </div>
            <div className="input">
              <label htmlFor="city">City</label>
              <select
                type="text"
                id="city"
                name="city"
                value={userForm.city}
                onInput={handleInput}
              >
                <option value="">-- Choose city</option>
                <option value="ikeja">Ikeja</option>
                <option value="yaba">Yaba</option>
                <option value="ikorodu">Ikorodu</option>
                <option value="oshodi">Oshodi</option>
              </select>
            </div>
            <div className="input">
              <label htmlFor="state">State</label>
              <select
                type="text"
                id="state"
                name="state"
                value={userForm.state}
                onInput={handleInput}
              >
                <option value="">-- Choose state</option>
                <option value="lagos">Lagos</option>
              </select>
            </div>
            <div className="input">
              <label htmlFor="country">Country</label>
              <select
                type="text"
                id="country"
                name="country"
                value={userForm.country}
                onInput={handleInput}
              >
                <option value="">-- Choose country</option>
                <option value="nigeria">Nigeria</option>
              </select>
            </div>

            <Spacer axis="y" space="20" />

            <button className="serious-btn small" title="Save changes">
              Save changes
            </button>
          </form>
        </div>
        <div className="half">
          <h3>Previous Orders</h3>
          <div className="order-card-con">
            {getUserOrders().map((orderId) => (
              <OrderCard orderId={orderId} />
            ))}
          </div>
        </div>

        <div className="clear-fix"></div>
      </div>
    </div>
  );
}
