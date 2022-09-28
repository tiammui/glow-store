import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ({ showSignIn, showSignInHnd, uiConfig, authUI }) {
  useEffect(() => {
    authUI.start('#sign-in-ui', uiConfig);
  }, []);

  return (
    <div id="sign-in-modal" className={`modal ${showSignIn ? ' show' : ''}`}>
      <div className="content">
        <button onClick={() => showSignInHnd(false)}>Close</button>
        <p id="sign-in-ui"></p>
      </div>
    </div>
  );
}
