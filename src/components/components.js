import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import { getProduct } from './../helpers';

export function HeaderItem({ productId }) {
  let product = getProduct(productId);

  return (
    <li className="header-item">
      {product.hotSale? <HotSaleTag />: null}
      <div className="ad-text">
        <h3>{product.name}</h3>
        <p className="num">N{product.price}</p>
        <AddToCartButton productId={product.id} isHeader={true} />
      </div>
    </li>
  );
}

export function ProductCard() {
  return <div></div>;
}

export function SmallProductCard() {
  return <div></div>;
}

export function CategoryCard() {
  return <div></div>;
}

export function CartItem() {
  return <div></div>;
}

export function AddToCartButton({ productId, isHeader }) {
  return (
    <button className={`add-to-cart ${isHeader ? 'header' : ''}`}>
      Add to Cart
    </button>
  );
}

export function HotSaleTag() {
  return <div className="hot-sale-tag">Hot Sales</div>;
}
export function DiscountTag() {
  return <div></div>;
}
