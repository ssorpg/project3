export default function UserAuth() {
  const cookies = document.cookie.split(';');
  let loggedIn = false;
  
  cookies.forEach(cookie => {
    if(cookie.includes('UserId')) {
      loggedIn = true;
    }
  });

  return loggedIn;
}
