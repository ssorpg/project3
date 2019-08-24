export default function getImg(user) {
    const hasImage = user.profileImage.length ?
        `/images/${user.profileImage[0].filename}`
        : 'https://cdn2.iconfinder.com/data/icons/ui-1/60/05-512.png';
    return hasImage;
};