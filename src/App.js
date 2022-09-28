import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import WebFont from 'webfontloader';

import firebase, {auth,uiConfig,authUI} from './firebase'
import './styles/App.css';
import './styles/styles.css';
import './styles/desktop.css';
import 'firebaseui/dist/firebaseui.css';

import Home from './pages/Home';
import ProductCategory from './pages/ProductCategory';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import CheckOut from './pages/CheckOut';
import OrderDetails from './pages/OrderDetails';
import Contacts from './pages/Contacts';
import UserDetails from './pages/UserDetails';
import NotFound from './pages/NotFound';
import TopBar from './components/TopBar';
import Footer from './components/Footer';
import Menu from './components/Menu';
import SignInModal from './components/SignInModal';
import { SnackBar } from './components/bigComponents';
import { getCart, getProduct, indexOfObject } from './helpers';
import { CartItemMaker } from './mockbase';

export default function App() {
  const [cart, setCart] = useState(getCart());
  const [cartQuantity, setCartQuantity] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Lato'],
      },
    });
  }, []);

  useEffect(() => {
    let quantity =
      cart.length &&
      (cart.length == 1
        ? cart[0].quantity
        : cart.reduce((a, b, i) =>
            i == 1 ? a.quantity + b.quantity : a + b.quantity
          )); // reduce return the complete element of an array if it length == 1

    setCartQuantity(quantity);
    // update firestore
  }, [cart]);

  /**
   * @param {"add"|"remove"|"increment"|"decrement"} operation
   * @param {number} productId
   */
  function cartHandler(operation, productId) {
    // use snackbar to announce status of operations

    switch (operation) {
      case 'add':
        if (
          indexOfObject(cart, 'productId', productId) == -1 &&
          getProduct(productId)
        ) {
          // if product is not already in cart and it exist

          setCart((prev) => {
            if (prev.length) {
              return [...prev, new CartItemMaker(productId, 1)];
            }
            return [new CartItemMaker(productId, 1)];
          });
        } else if (indexOfObject(cart, 'productId', productId) != -1) {
          cartHandler('increment', productId);
        } else {
          // product can't be fetched or doesn't exist
        }
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
      <TopBar showSignInHnd={setShowSignIn} showMenuHnd={setShowMenu} cartQuantity={cartQuantity} />
      <Menu showMenu={showMenu} showMenuHnd={setShowMenu} />

      <div id="main-container">
        <Routes>
          <Route path="/" element={<Home cartHandler={cartHandler} />} />
          <Route path="products" element={<ProductCategory filter="All" />} />
          <Route
            path="products/category/:category"
            element={<ProductCategory cartHandler={cartHandler} />}
          />
          <Route
            path="products/:productId"
            element={<ProductDetails cart={cart} cartHandler={cartHandler} />}
          />
          <Route
            path="cart"
            element={<Cart cart={cart} cartHandler={cartHandler} />}
          />
          <Route path="checkout" element={<CheckOut cart={cart} />} />

          <Route path="user" element={<UserDetails />} />
          <Route path="user/orders/:orderId" element={<OrderDetails />} />

          <Route path="contacts" element={<Contacts />} />
          <Route path="contact" element={<Contacts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
      <SnackBar />
      <SignInModal uiConfig={uiConfig} showSignIn={showSignIn} showSignInHnd={setShowSignIn} authUI={authUI} />
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
