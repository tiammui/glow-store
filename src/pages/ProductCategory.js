import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';

import { capitalise, range, getInitObject } from './../helpers';
import {
  ProductCard,
  Pagination,
  SmallProductCard,
} from './../components/components';

export default function ({ getProduct, filter, cartHandler }) {
  let navigate = useNavigate();
  let catFilter = filter || useParams().category;

  const [currentPaginate, setCurrentPaginate] = useState(1);

  useEffect(
    function () {
      window.scrollTo(0, 0);
      setCurrentPaginate(1);
    },
    [catFilter]
  );

  useEffect(
    function () {
      window.scrollTo(0, 0);
      // capture change and fetch data as needed
    },
    [currentPaginate]
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
          {getInitObject().productCategories.map((cat) => (
            <option key={nanoid()} value={cat}>{capitalise(cat)}</option>
          ))}
        </select>
      </div>

      <h2>{capitalise(catFilter)}</h2>
      <div className="product-card-con">
        <Pagination amtPage={10} currentPage={currentPaginate} setPage={setCurrentPaginate} />
        <p className="pager">{currentPaginate}/10</p>
        {range(1).map(() => (
          <ProductCard getProduct={getProduct} productId="100001" cartHandler={cartHandler} key={nanoid()} />
        ))}

        <div className="clear-fix"></div>
        <p className="pager">{currentPaginate}/10</p>
        <Pagination amtPage={10} currentPage={currentPaginate} setPage={setCurrentPaginate} />
      </div>

      <h3>Recommended Products</h3>
      <div className="carousel product-card-small-con">
        <ul>
          {range(10).map(() => (
            <SmallProductCard productId="100001" getProduct={getProduct} key={nanoid()} />
          ))}
        </ul>
        <ul>
          {range(10).map(() => (
            <SmallProductCard productId="100001" getProduct={getProduct} key={nanoid()} />
          ))}
        </ul>
      </div>
    </div>
  );
}
