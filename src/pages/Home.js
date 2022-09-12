import React from 'react';
import { Link } from 'react-router-dom';

import { HeaderItem } from './../components/components';

export default function () {
  return (
    <>
      <div id="home-header">
        <ul className="carousel">
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
    </>
  );
}
