import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretLeft,
  faCaretRight,
  faEllipsisH,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { nanoid } from 'nanoid';

import { getProduct, calcDiscount, range, paginateCat } from './../helpers';

export function AddToCartButton({ productId, isHeader }) {
  return (
    <button className={`add-to-cart ${isHeader ? 'header' : ''}`}>
      Add to Cart
    </button>
  );
}

export function CartItem() {
  return <div></div>;
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

export function HeaderItem({ productId }) {
  let product = getProduct(productId);

  return (
    <li className="item">
      {product.hotSale ? <HotSaleTag /> : null}
      <div className="ad-text">
        <h3>{product.name}</h3>
        <p className="priceCon">
          <ProductPrice price={product.price} discount={product.discount} />
        </p>
        <AddToCartButton productId={product.id} isHeader={true} />
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

export function Pagination({ amtPage, setPage, currentPage }) {
  function Paginators() {
    let paginators;
    if (amtPage <= 6) {
      paginators = range(amtPage).map((val) => <li className="item">{val}</li>);
    } else {
      // truncate paginators
      paginators = range(4).map((pgNum) => (
        <li className="item" onClick={()=>setPage(pgNum)} key={nanoid()}>
          {pgNum}
        </li>
      ));

      paginators.push(
        <li className="item trunc" key={nanoid()}>
          <FontAwesomeIcon icon={faEllipsisH} />{' '}
        </li>
      );
      paginators.push(<li className="item" onClick={()=>setPage(amtPage)} key={nanoid()}>{amtPage}</li>);
    }
    return paginators;
  }
  return (
    <>
    <ul className="pagination">
      <li className="item" onClick={()=>setPage((currentPage)=>currentPage>1?(currentPage-1):currentPage)} key={nanoid()}>
        <FontAwesomeIcon icon={faCaretLeft} />{' '}
      </li>
      <Paginators />
      <li className="item" onClick={()=>setPage((currentPage)=>currentPage<amtPage?(currentPage+1):currentPage)} key={nanoid()}>
        <FontAwesomeIcon icon={faCaretRight} />{' '}
      </li>
    </ul>
    </>
  );
}

export function ProductCard({ productId }) {
  let product = getProduct(productId);

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="img">
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
          <AddToCartButton productId={product.id} />
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

export function Quantifier({isForCart,cartItem,cartHandler}){

  return (
    <div className={`quanifier ${isForCart?"cart":""}`}>
      <button onClick={()=>cartHandler("decrement",cartItem.productId)}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <div className="quantity">
        {cartItem.quantity}
      </div>
      <button onClick={()=>cartHandler("increment",cartItem.productId)}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  )
}

export function SmallProductCard({ productId }) {
  let product = getProduct(productId);

  return (
    <div className="product-card-small">
      <Link to={`/products/${product.id}`} className="img">
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

export function Spacer ({axis,space}){
  return(
    <div style={{display:(!axis)||axis=="x"?"inline-block":"block",height:(!axis)||axis=="x"?"0px":space+"px",width:(!axis)||axis=="x"?space+"px":"0px"}}></div>
  )
}