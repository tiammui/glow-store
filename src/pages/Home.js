import React from 'react';
import { Link } from 'react-router-dom';

import { HeaderItem, CatSectionItem, ProductCard } from './../components/components';

export default function () {
  return (
    <>
      <div id="home-header" className="carousel" >
        <ul>
          <HeaderItem />
          <HeaderItem />
          <HeaderItem />
        </ul>
      </div>
      <div className="navigator">
        <button className="active" title=""></button>
        <button title=""></button>
        <button title=""></button>
      </div>

      <h2>
        Product Categories
      </h2>
      <div id="cat-section" className="carousel">
        <ul>
          <CatSectionItem category="Moisturiser" />
          <CatSectionItem category="Moisturiser" />
          <CatSectionItem category="Moisturiser" />
          <CatSectionItem category="Moisturiser" />
        </ul>
      </div>

      <h2>
        Fresh Products
      </h2>
      <div className="product-card-con">
        <ProductCard />
        <ProductCard />
        <div className="clear-fix"></div>
        <Link to="/products/category/fresh" >See all fresh products</Link>
      </div>

      <h2>
        Trending
      </h2>
      <div className="product-card-con">
        <ProductCard />
        <ProductCard />
        <div className="clear-fix"></div>
        <Link to="/products/category/trending" >See all trending products</Link>
      </div>
    </>
  );
}
