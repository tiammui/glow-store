import React from 'react';
import { Link } from 'react-router-dom';

export default function () {
  return (
    <div id="top-bar">
        <button className="icon-block" >
          <i class="fas fa-bars"></i>
        </button>
        <div className="logo"></div>
        <button className="icon-block cart" >
          <i class="fas fa-shopping-cart"></i>
          <div className="cart-dot">3</div>
        </button>
    </div>
  );
}
