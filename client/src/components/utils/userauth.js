import React from 'react';

function UserAuth (userId) {
  if (isNaN(userId) === true) {
    console.log('You are logged in.');
    return true;
  } else {
    console.log(`You are not logged in.`);
    return false;
  }
}

export default UserAuth;
