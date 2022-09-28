import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faHome,
  faChevronRight,
  faBox,
  faTags,
  faSmile,
} from '@fortawesome/free-solid-svg-icons';
import { nanoid } from 'nanoid';

import { getInitObject, capitalise } from './../helpers';

export default function ({ showMenu, showMenuHnd }) {
  let navigate = useNavigate();

  function hndItemClick(e,to) {
    e.preventDefault()
    showMenuHnd(false);
    navigate(to);
  }
  function hndBlankClick(e) {
    let target = e.target;

    if (e.currentTarget == target) {
      showMenuHnd(false);
    }
  }
  function MenuItem({ text, to, icon }) {
    return (
      <a href="" onClick={(e) => hndItemClick(e,to)} className="item">
        <FontAwesomeIcon icon={icon} className="icon" />
        <div>{text}</div>
      </a>
    );
  }
  function MenuSectionHead({ text, to }) {
    return (
      <a
        href=""
        onClick={(e) => hndItemClick(e,to)}
        className="section-head"
      >
        <div>{text}</div>
        <FontAwesomeIcon icon={faChevronRight} className="icon" />
      </a>
    );
  }

  return (
    <div id="menu" onClick={hndBlankClick} className={`modal ${showMenu ? 'show' : ''}`}>
      <div className="content">
        <div className="top">
          <button onClick={() => showMenuHnd(false)} title="Close menu">
            <FontAwesomeIcon icon={faTimes} className="icon" />
          </button>
          <img src="https://storage.cloud.google.com/glow-dab38.appspot.com/general/logo_topbar.png?alt=media" alt="logo" />
        </div>
        <div className="body">
          <div className="section">
            <MenuItem text="Home" to="/" icon={faHome} />
          </div>
          <div className="section">
            <MenuSectionHead to="/user" text="Your Account" />
            <MenuItem text="Orders" to="/user/orders" icon={faBox} />
          </div>
          <div className="section main">
            <MenuSectionHead to="/products/category/all" text="Shop by category" />
            {getInitObject().productCategories.map((cat) => (
              <MenuItem
                key={nanoid()}
                text={capitalise(cat)}
                to={`/products/category/${cat}`}
                icon={faTags}
              />
            ))}
          </div>
          <div className="section">
            <MenuItem text="Consultancy" to="/" icon={faSmile} />
          </div>
        </div>
        <div className="foot">
          <div className="socials">
            <a href="" className="socials-boxes"></a>
            <a href="" className="socials-boxes"></a>
            <a href="" className="socials-boxes"></a>
          </div>
        </div>
      </div>
    </div>
  );
}
