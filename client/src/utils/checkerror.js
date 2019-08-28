export default function CheckError(error) {
    if (error.response) {
        console.log(error.response);

        const page = document.getElementById('App');
        const footer = document.getElementsByTagName('footer');
        const popover = document.getElementById('popover');
        const h3 = popover.getElementsByClassName('card-title')[0];
    
        page.style = 'display: none';
        footer[0].style = 'display: none';
        h3.innerHTML = error.response.data;
        popover.style = 'display: block';
    }
    else {
        console.log('Unknown error: ', error)
    }
}