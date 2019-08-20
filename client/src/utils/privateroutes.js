export default function PrivateRoutes(isAuth) {
    if (!isAuth && window.location.pathname !== '/' && window.location.pathname !== '/register') {
        const page = document.getElementById('App');
        const popover = document.getElementById('popover');
        const h3 = popover.getElementsByClassName('card-title')[0];

        page.style = 'display: none';
        h3.innerHTML = 'You are not logged in. Redirecting you to login.';
        popover.style = 'display: block';
        
        setTimeout(() => window.location = '/', 2500);
    }
}
