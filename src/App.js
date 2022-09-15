import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import WebFont from 'webfontloader';

import './styles/App.css';
import './styles/styles.css';
import './styles/desktop.css';

import Home from './pages/Home';
import ProductCategory from './pages/ProductCategory';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import CheckOut from './pages/CheckOut';
import OrderSuccess from './pages/OrderSuccess';
import OrderDetails from './pages/OrderDetails';
import Contacts from './pages/Contacts';
import UserDetails from './pages/UserDetails';
import UserOrders from './pages/UserOrders';
import NotFound from './pages/NotFound';
import TopBar from './components/TopBar';
import Footer from './components/Footer';
import SignInModal from './components/SignInModal';
import {
  HeaderItem,
  ProductCard,
  SmallProductCard,
  CategoryCard,
  CartItem,
  Button,
} from './components/components';
import { getCart, getProduct, indexOfObject } from './helpers';
import { CartItemMaker } from './mockbase';

export default function App() {
  const [cart, setCart] = useState(getCart());
  const [cartQuantity, setCartQuantity] = useState(0);
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Lato'],
      },
    });
  }, []);
  useEffect(() => {
    setCartQuantity(
      cart.reduce((a, b, i) =>
        i == 1 ? a.quantity + b.quantity : a + b.quantity
      )
    );
  }, [cart]);

  /**
   * @param {"add"|"remove"|"increment"|"decrement"} operation
   * @param {number} productId
   */
  function cartHandler(operation, productId) {
    switch (operation) {
      case 'add':
        if (getProduct(productId))
          setCart((prev) => [...prev, CartItemMaker(productId, 1)]);
        break;
      case 'remove':
        setCart((prev) => prev.filter((item) => item.productId != productId));
        break;
      case 'increment':
        setCart((prev) =>
          prev.map((item) =>
            item.productId == productId
              ? new CartItemMaker(productId, item.quantity + 1)
              : item
          )
        );
        break;
      case 'decrement':
        setCart((prev) =>
          prev.map((item) =>
            item.productId == productId
              ? new CartItemMaker(
                  productId,
                  item.quantity == 1 ? 1 : item.quantity - 1
                )
              : item
          )
        );
        break;
      default: //nothing
    }

    // if user is logged-in,after any operation update user cart on firebase, if not save to localStorage
  }

  return (
    <>
      <TopBar cartQuantity={cartQuantity} />

      <div id="main-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="products" element={<ProductCategory filter="All" />} />
          <Route
            path="products/category/:category"
            element={<ProductCategory />}
          />
          <Route
            path="products/:productId"
            element={<ProductDetails cart={cart} cartHandler={cartHandler} />}
          />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<CheckOut />} />
          <Route path="checkout/success" element={<OrderSuccess />} />
          <Route path="user" element={<UserDetails />} />
          <Route path="user/orders" element={<UserOrders />} />
          <Route path="user/orders/:orderId" element={<OrderDetails />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
      <SignInModal />
    </>
  );
}

function multiplier(item, quantity) {
  let items = [];
  for (let i = 0; i < quantity; i++) {
    items.push(item);
  }

  return items;
}
