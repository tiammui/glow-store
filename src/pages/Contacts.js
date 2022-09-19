import React from 'react';
import { Link } from 'react-router-dom';

import Footer from './../components/Footer';

export default function () {
  return (
    <div id="contacts">
      <div className="logo-con">
        <div className="logo"></div>
      </div>
      <div className="contact-btn-con">
        <button>Order from our website</button>
        <button>Order from outside Lagos</button>
        <button>For bulk purchase</button>
        <button>For advice and consultance</button>
      </div>
      <Footer />
    </div>
  );
}
