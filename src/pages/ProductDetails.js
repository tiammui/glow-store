import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';

import {
  ProductPrice,
  AddToCartButton,
  Quantifier,
  Spacer,
  SmallProductCard,
  DiscountTag,
} from './../components/components';
import { indexOfObject, capitalise, range } from './../helpers';

export default function ({ cart, cartHandler, getProduct }) {
  let productId = useParams().productId;
  let [activeThumbIndex, setActiveThumbIndex] = useState(0);
  let [product,setProduct] = useState({});
  
  /** index of product cart */
  let cartIndex = indexOfObject(cart, 'productId', productId);

  useEffect(
    function () {
      window.scrollTo(0, 0);
      getProduct(productId).then(setProduct);
      setActiveThumbIndex(0);

    },
    [productId]
  );
  return (
    <>
      <div className="product-con">
        <div className="img-con half">
          <div className="img" style={{backgroundImage:`url(${product.mainImgURL})`}}>
            {product.discount ? (
              <DiscountTag discount={product.discount} offset={45} />
            ) : null}
          </div>
          <div className="thumbnails">
            {product?.imgsURL?.map((URL, i) => (
              <div
                key={nanoid()}
                className={`thumb ${activeThumbIndex == i ? 'active' : ''}`}
                onClick={() => {
                  setActiveThumbIndex(i);
                }}
              ></div>
            ))}
            {/* <div className="thumb active"></div> */}
          </div>
        </div>
        <div className="details-con half">
          <h3>{product.name}</h3>
          <p className="priceCon">
            {' '}
            <ProductPrice
              price={product.price}
              discount={product.discount}
            />{' '}
          </p>
          {cartIndex == -1 ? (
            ''
          ) : (
            <Quantifier cartItem={cart[cartIndex]} cartHandler={cartHandler} />
          )}
          <Spacer space={15} />
          <AddToCartButton cartHandler={cartHandler} productId={productId} />
          <p className="category">
            <b>Category:</b> {capitalise(product.category)}
          </p>
          <p>
            <b>Description</b>
          </p>
          <p className="desc">{product.desc}</p>
        </div>
      </div>
      <div className="clear-fix"></div>

      <h3>Similar Products</h3>
      <div className="carousel product-card-small-con">
        <ul>
          {range(10).map(() => (
            <SmallProductCard
              productId="100001"
              getProduct={getProduct}
              key={nanoid()}
            />
          ))}
        </ul>
      </div>

      <h3>Trending Products</h3>
      <div className="carousel product-card-small-con">
        <ul>
          {range(10).map(() => (
            <SmallProductCard
              productId="100001"
              getProduct={getProduct}
              key={nanoid()}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
