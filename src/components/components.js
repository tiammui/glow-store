import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faCaretLeft,
  faCaretRight,
  faEllipsisH,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { nanoid } from 'nanoid';

import {
  calcDiscount,
  range,
  cartCost,
  cartItemCost,
  capitalise,
  orderCost,
  orderItemAmt,
} from './../helpers';

export function AddToCartButton({ productId, isHeader, cartHandler }) {
  return (
    <button
      onClick={() => {
        cartHandler('add', productId);
      }}
      className={`add-to-cart ${isHeader ? 'header' : ''}`}
    >
      Add to Cart
    </button>
  );
}

export function CartCost({ cart, getProduct }) {
  //cartCost
  return '₦' + cartCost(cart, getProduct);
}

export function CartItem({ cartHandler, cartItem, getProduct }) {
  let [product, setProduct] = useState({});

  useEffect(() => {
    getProduct(cartItem.productId).then(setProduct);
  }, []);

  return (
    <div className="cart-item">
      <div className="details">
        <div className="img"></div>
        <div className="info">
          <Link to={`/products/${cartItem.productId}`} className="name">
            {product.name}
          </Link>
          <div className="priceCon">
            <ProductPrice price={product.price} discount={product.discount} />
          </div>
        </div>
      </div>
      <div className="quantity">
        Quantity:{' '}
        <Quantifier
          isForCart={true}
          cartHandler={cartHandler}
          cartItem={cartItem}
        />
      </div>
      <div className="total">
        Subtotal:{' '}
        <b>
          <CartItemCost cartItem={cartItem} getProduct={getProduct} />{' '}
        </b>
      </div>
      <button
        className="remove"
        onClick={() => cartHandler('remove', cartItem.productId)}
        title="Remove from cart"
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
}

export function CartItemCost({ cartItem, getProduct }) {
  let [product, setProduct] = useState({});
  getProduct(cartItem.productId).then(setProduct);

  return '₦' + cartItemCost(cartItem.quantity, product.price, product.discount);
}

export function CatSectionItem({ category }) {
  return (
    <li className="item">
      <Link to={`/products/category/${category}`}>
        <div className="cat-img"></div>
        <p>{category}</p>
      </Link>
    </li>
  );
}

export function Discount({ price, discount }) {
  return (
    <span>
      <del>₦{price}</del> ₦{calcDiscount(price, discount)}{' '}
    </span>
  );
}

export function DiscountTag({ discount, offset }) {
  return (
    <div className="discount-tag" style={{ bottom: offset || 20 }}>
      {discount}% off <div className="deco"></div>
    </div>
  );
}

export function HeaderItem({ productId, cartHandler, getProduct }) {
  let [product, setProduct] = useState({});
  getProduct(productId).then(setProduct);

  return (
    <li className="item" style={{backgroundImage:`url(${product.mainImgURL})`}}>
      {product.hotSale ? <HotSaleTag /> : null}
      <div className="ad-text">
        <h3>{product.name}</h3>
        <p className="priceCon">
          <ProductPrice price={product.price} discount={product.discount} />
        </p>
        <AddToCartButton
          cartHandler={cartHandler}
          productId={product.id}
          isHeader={true}
        />
      </div>
    </li>
  );
}

export function HotSaleTag({ offset }) {
  return (
    <div
      className="hot-sale-tag"
      style={{ top: offset || 20, right: offset || 20 }}
    >
      Hot Sales
    </div>
  );
}

export function OrderCard({ orderId, getItem }) {
  let [order, setorder] = useState();

  useEffect(function () {
    getItem('order', orderId).then(setorder);
  }, []);
  useEffect(function () {
    console.log('orderly', order);
  }, [order]);


  return order ? (
    <div className="order-card">
      <div className="img"></div>
      <div className="details">
        <div className="title">Order {order.id}</div>
        <div>Placed on {order.timeStamp?.toDateString()}</div>
        <div>Total: ₦{orderCost(order.products)}</div>
        <div>
          <b>{orderItemAmt(order.products)} Items</b>
        </div>
        <div>
          Status:{' '}
          <span className={`status ${order.status?.toLowerCase()}`}>
            {capitalise(order.status?.toLowerCase())}
          </span>
        </div>
      </div>
    </div>
  ): "Loading ...";
}

export function Pagination({ amtPage, setPage, currentPage }) {
  function Paginators() {
    let paginators;
    if (amtPage <= 6) {
      paginators = range(amtPage).map((val) => <li className="item">{val}</li>);
    } else {
      // truncate paginators
      paginators = range(4).map((pgNum) => (
        <li className="item" onClick={() => setPage(pgNum)} key={nanoid()}>
          {pgNum}
        </li>
      ));

      paginators.push(
        <li className="item trunc" key={nanoid()}>
          <FontAwesomeIcon icon={faEllipsisH} />{' '}
        </li>
      );
      paginators.push(
        <li className="item" onClick={() => setPage(amtPage)} key={nanoid()}>
          {amtPage}
        </li>
      );
    }
    return paginators;
  }
  return (
    <>
      <ul className="pagination">
        <li
          className="item"
          onClick={() =>
            setPage((currentPage) =>
              currentPage > 1 ? currentPage - 1 : currentPage
            )
          }
          key={nanoid()}
        >
          <FontAwesomeIcon icon={faCaretLeft} />{' '}
        </li>
        <Paginators />
        <li
          className="item"
          onClick={() =>
            setPage((currentPage) =>
              currentPage < amtPage ? currentPage + 1 : currentPage
            )
          }
          key={nanoid()}
        >
          <FontAwesomeIcon icon={faCaretRight} />{' '}
        </li>
      </ul>
    </>
  );
}

export function ProductCard({ productId, cartHandler, getProduct }) {
  let [product, setProduct] = useState({});
  getProduct(productId).then(setProduct);

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="img" style={{backgroundImage:`url(${product.mainImgURL})`}}>
        {product.discount ? <DiscountTag discount={product.discount} /> : null}
      </Link>
      <div className="details">
        <p className="name">
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </p>
        <p className="priceCon">
          {' '}
          <ProductPrice
            price={product.price}
            discount={product.discount}
          />{' '}
        </p>
        <div className="btn-con">
          <AddToCartButton cartHandler={cartHandler} productId={product.id} />
        </div>
        {product.hotSale ? <HotSaleTag /> : null}
      </div>
    </div>
  );
}

export function ProductPrice({ price, discount }) {
  return (
    <span className="price">
      {' '}
      {discount ? (
        <Discount price={price} discount={discount} />
      ) : (
        `₦${price}`
      )}{' '}
    </span>
  );
}

export function Quantifier({ isForCart, cartItem, cartHandler }) {
  return (
    <div className={`quanifier ${isForCart ? 'cart' : ''}`}>
      <button onClick={() => cartHandler('decrement', cartItem.productId)}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <div className="quantity">{cartItem.quantity}</div>
      <button onClick={() => cartHandler('increment', cartItem.productId)}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
}

export function SmallProductCard({ productId, getProduct }) {
  let [product, setProduct] = useState({});

  useEffect(() => {
    getProduct(productId).then(setProduct);
  }, []);

  return (
    <div className="product-card-small">
      <Link to={`/products/${product.id}`} className="img" style={{backgroundImage:`url(${product.mainImgURL})`}}>
        {product.discount ? <DiscountTag discount={product.discount} /> : null}
      </Link>
      <div className="details">
        <p className="name">
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </p>
        <p className="priceCon">
          {' '}
          <ProductPrice
            price={product.price}
            discount={product.discount}
          />{' '}
        </p>
      </div>
    </div>
  );
}

export function Spacer({ axis, space }) {
  return (
    <div
      style={{
        display: !axis || axis == 'x' ? 'inline-block' : 'block',
        height: !axis || axis == 'x' ? '0px' : space + 'px',
        width: !axis || axis == 'x' ? space + 'px' : '0px',
      }}
    ></div>
  );
}
