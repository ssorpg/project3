import React from 'react';

function UserAuth() {
  const cookies = document.cookie.split(';');
  let loggedIn = false;
  
  cookies.forEach(cookie => {
    if(cookie.indexOf('loggedIn') > -1) {
      loggedIn = Boolean(cookie.split('=')[1]);
    }

  })
  
  if (loggedIn === true) {
    console.log('You are logged in.');
    return true;
  } else {
    console.log(`You are not logged in.`);
    return false;
  }
}

export default UserAuth;
