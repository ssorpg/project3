export default function GetYourId() {
    const cookies = document.cookie.split(';');
    let userId;

    cookies.forEach(cookie => {
        if (cookie.includes('userId')) {
            userId = cookie.split('=')[1];
        }
    });

    return parseInt(userId);
}