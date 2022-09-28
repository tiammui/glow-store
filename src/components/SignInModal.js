import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { nanoid } from 'nanoid';


export default function ({ showSignIn, showSignInHnd, uiConfig, authUI }) {
  let navigate = useNavigate();

  useEffect(() => {
    authUI.start('#sign-in-ui', uiConfig);
  },[]);

  return (
    <div id="sign-in-modal" className={`modal ${showSignIn ? ' show' : ''}`}>
      <div className="content">
        <button className="remove" onClick={() => showSignInHnd(false)} title="Close modal">
          <FontAwesomeIcon icon={faTimes} className="icon" />
        </button>
        <h3>Sign in / Sign up</h3>
        <p id="sign-in-ui"></p>
      </div>
    </div>
  );
}
