import React, {useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';

import {
  ProductPrice,
  AddToCartButton,
  Quantifier,
  Spacer,
  SmallProductCard
} from './../components/components';
import { getProduct, indexOfObject, capitalise, range } from './../helpers';

export default function ({ cart, cartHandler }) {
  let productId = useParams().productId;
  let product = getProduct(productId);
  /** index of product cart */
  let cartIndex = indexOfObject(cart, 'productId', productId);

  useEffect(
    function () {
      window.scrollTo(0, 0);
    },
    [productId]
  );
  return (
    <>
      <div className="product-con">
        <div className="img-con">
          <div className="img"></div>
          <div className="thumbnails">
            <div className="thumb active"></div>
            <div className="thumb"></div>
            <div className="thumb"></div>
          </div>
        </div>
        <div className="details-con">
          <h3>{product.name}</h3>
          <p className="priceCon">
            {' '}
            <ProductPrice
              price={product.price}
              discount={product.discount}
            />{' '}
          </p>
          <Quantifier cartItem={cart[cartIndex]} cartHandler={cartHandler} />
          <Spacer space={15} />
          <AddToCartButton />
          <p className="category"><b>Category:</b> {capitalise(product.category)}</p>
          <p><b>Description</b></p>
          <p className="desc">{product.desc}</p>
        </div>
      </div>

      <h3>Similar Products</h3>
      <div className="carousel product-card-small-con">
        <ul>
          {range(10).map(() => (
            <SmallProductCard key={nanoid()} />
          ))}
        </ul>
      </div>

      <h3>Similar Products</h3>
      <div className="carousel product-card-small-con">
        <ul>
          {range(10).map(() => (
            <SmallProductCard key={nanoid()} />
          ))}
        </ul>
      </div>

    </>
  );
}
