export default function GetYourId() {
    const cookies = document.cookie.split(';');
    let UserId;

    cookies.forEach(cookie => {
        if (cookie.includes('UserId')) {
            UserId = cookie.split('=')[1];
        }
    });

    return parseInt(UserId);
}