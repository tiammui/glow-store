import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';

import {
  HeaderItem,
  CatSectionItem,
  ProductCard,
} from './../components/components';
import { capitalise, range, getProduct,getInitObject } from './../helpers';

export default function ({ cartHandler }) {
  let [activeNavigator, setActiveNavigator] = useState(0); // activeNavigator is 0 indexed

  /**
   * @param {number} itemIndex index of the header item to scroll to
   */
  function headerScroll(itemIndex) {
    let container = document.getElementById('homePage');
    let HEADER_ITEM_MAX_WIDTH = 600; // changing this will affect scrolling behaviour, update `#home-header .item` selector `max-width` property to same.

    let SCROLL_WIDTH =
      window.innerWidth > HEADER_ITEM_MAX_WIDTH
        ? HEADER_ITEM_MAX_WIDTH
        : window.innerWidth;

    let scrollLength = SCROLL_WIDTH * itemIndex;

    console.log(scrollLength);

    container.scroll(0, scrollLength);

    setActiveNavigator(itemIndex);
  }
  function headerScroll2(itemIndex){
    let element = document.getElementById('home-header').getElementsByClassName('item')[itemIndex];

    element.scrollIntoView()
  }
  return (
    <div id="homePage">
      <div
        id="home-header"
        className="carousel"
        onScroll={() => {
          /* update activeNavigator */
        }}
      >
        <ul>
          {getInitObject().headerInfos.map((productId) => (
            <HeaderItem
              productId={productId}
              key={nanoid()}
              cartHandler={cartHandler}
            />
          ))}
        </ul>
      </div>
      {/* TODO manage scrolling with navigator */}
      <div className="navigator">
        {getInitObject().headerInfos.map((productId, i) => (
          <button
            className={activeNavigator == i ? 'active' : ''}
            title={getProduct(productId).name}
            key={nanoid()}
            onClick={() => {
              activeNavigator == i ? null : headerScroll2(i);
            }}
          ></button>
        ))}
      </div>

      <h2>Product Categories</h2>
      <div className="carousel cat-section">
        <ul>
          {getInitObject().productCategories.map((cat) => (
            <CatSectionItem category={capitalise(cat)} key={nanoid()} />
          ))}
        </ul>
      </div>

      <h2>Fresh Products</h2>
      <div className="product-card-con">
        {range(2).map(() => (
          <ProductCard cartHandler={cartHandler} key={nanoid()} />
        ))}

        <div className="clear-fix"></div>
        <Link to="/products/category/fresh">See all fresh products</Link>
      </div>

      <h2>Trending</h2>
      <div className="product-card-con">
        {range(3).map(() => (
          <ProductCard cartHandler={cartHandler} key={nanoid()} />
        ))}
        <div className="clear-fix"></div>
        <Link to="/products/category/trending">See all trending products</Link>
      </div>
    </div>
  );
}
