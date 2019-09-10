export default function ExtractProfileImage(user) {
  const hasImage = user.profileImage
    && user.profileImage.length
    && user.profileImage[0].filename ? // this is a dumb turnery but it works
    `/images/${user.profileImage[0].filename}`
    : '/images/nophoto.png';

  return hasImage;
};
