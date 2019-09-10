export default function UserLocation(props) {
  var location = null;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition( position => {
      // console.log('here', position)
      location = position;
      return(location);
    });
    console.log('loca', location)
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
  console.log(location);
};
