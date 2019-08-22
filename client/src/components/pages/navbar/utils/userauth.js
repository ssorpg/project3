export default function UserAuth() {
  const cookies = document.cookie.split(';');
  let loggedIn = false;
  
  cookies.forEach(cookie => {
    if(cookie.includes('userId')) {
      loggedIn = true;
    }
  });

  return loggedIn;
}
