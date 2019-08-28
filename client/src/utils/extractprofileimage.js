export default function ExtractProfileImage(user) {
    const hasImage = user.profileImage
        && user.profileImage.length
        && user.profileImage[0].filename ? // this is a dumb turnery but it works
        `/images/${user.profileImage[0].filename}`
        : 'https://cdn2.iconfinder.com/data/icons/ui-1/60/05-512.png';

    return hasImage;
};