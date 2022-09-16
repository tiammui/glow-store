import React from 'react';
import { Link } from 'react-router-dom';
import {nanoid} from 'nanoid';

import { HeaderItem, CatSectionItem, ProductCard } from './../components/components';
import {categories} from './../mockbase';
import {capitalise, range} from './../helpers';

export default function ({cartHandler}) {
  return (
    <div id="homePage">
      <div id="home-header" className="carousel" >
        <ul>
          <HeaderItem cartHandler={cartHandler} />
          <HeaderItem cartHandler={cartHandler} />
          <HeaderItem cartHandler={cartHandler} />
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
          {categories.map((cat)=><CatSectionItem category={capitalise(cat)} key={nanoid()} />)}
        </ul>
      </div>

      <h2>
        Fresh Products
      </h2>
      <div className="product-card-con">
        {range(2).map(() => (
          <ProductCard cartHandler={cartHandler} key={nanoid()} />
        ))}

        <div className="clear-fix"></div>
        <Link to="/products/category/fresh" >See all fresh products</Link>
      </div>

      <h2>
        Trending
      </h2>
      <div className="product-card-con">
        {range(3).map(() => (
          <ProductCard cartHandler={cartHandler} key={nanoid()} />
        ))}
        <div className="clear-fix"></div>
        <Link to="/products/category/trending" >See all trending products</Link>
      </div>
    </div>
  );
}
