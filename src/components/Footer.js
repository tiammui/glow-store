import React from 'react';
import { Link } from 'react-router-dom';

export default function () {
  return (
    <div id="footer">
      <div className="nav">
        <div className="socials">
          <a href="" className="socials-boxes"></a>
          <a href="" className="socials-boxes"></a>
          <a href="" className="socials-boxes"></a>
        </div>
        <Link to="/products" >All Products</Link>
      </div>
      <p className="address">
        2 Fatai Kadiri, Fola Agoro Bustop, Shomolu, Yaba, Lagos
      </p>
      <p className="copy">
        Copyright MrsIfy340 &copy; 2022
      </p>
    </div>
  );
}
