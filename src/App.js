import React, {useEffect} from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import WebFont from 'webfontloader';

import './styles/App.css';
import './styles/styles.css';

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

export default function App() {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Lato']
      }
    });
   }, []);

  return (
    <>
      <TopBar />

      <div id="main-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="products" element={<ProductCategory />} />
          <Route path="products/:productId" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<CheckOut />} />
          <Route path="checkout/success" element={<OrderSuccess />} />
          <Route path="user" element={<UserDetails />} />
          <Route path="user/orders" element={<UserOrders />} />
          <Route path="user/orders/:orderId" element={<OrderDetails />} />
          <Route path="contacts" element={<Contacts />} />
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
