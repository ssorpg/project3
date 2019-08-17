import React from 'react';
import UserAuth from './userauth';

export default function PrivateRoutes() {
  if(!UserAuth()) {
    if( window.location.pathname.indexOf('feed') > -1 ||
        window.location.pathname.indexOf('profile') > -1 ||
        window.location.pathname.indexOf('friends') > -1 ||
        window.location.pathname.indexOf('chat') > -1
      )
    {
      const page = document.getElementById('App');
      const popover = document.getElementById('popover');
      const h1 = popover.getElementsByClassName('card-title')[0];
      page.style = 'display: none';
      h1.innerHTML = 'You are not logged in. Redirecting you to login.';
      popover.style += "display: block";
      setTimeout( () => window.location = '/', 2500);
    }
  }
}
