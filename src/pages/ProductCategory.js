import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';

import { categories } from './../mockbase';
import { capitalise, range } from './../helpers';
import {
  ProductCard,
  Pagination,
  SmallProductCard,
} from './../components/components';

export default function ({ filter }) {
  let navigate = useNavigate();
  let catFilter = filter || useParams().category;

  useEffect(
    function () {
      window.scrollTo(0, 0);
    },
    [catFilter]
  );

  function filterChange(e) {
    navigate(`/products/category/${e.target.value}`);
  }
  return (
    <div id="category">
      <div id="filterCon">
        <h3>Filter by category</h3>
        <select
          name="catFilter"
          id="catFilter"
          value={catFilter}
          onChange={filterChange}
        >
          {categories.map((cat) => (
            <option value={cat}>{capitalise(cat)}</option>
          ))}
        </select>
      </div>

      <h2>{capitalise(catFilter)}</h2>
      <div className="product-card-con">
        <Pagination amtPage={10} />

        {range(1).map(() => (
          <ProductCard key={nanoid()} />
        ))}

        <div className="clear-fix"></div>
        <Pagination amtPage={10} />
      </div>

      <h3>Recommended Products</h3>
      <div id="cat-section" className="carousel">
        <ul>
          {range(10).map(() => (
            <SmallProductCard key={nanoid()} />
          ))}
        </ul>
        <ul>
          {range(10).map(() => (
            <SmallProductCard key={nanoid()} />
          ))}
        </ul>
      </div>
    </div>
  );
}
