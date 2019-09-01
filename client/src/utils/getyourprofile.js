// FUNCTIONS
import ax from 'axios';
import PageLoadError from './pageloaderror';

export default async function GetYourProfile() {
  try {
    const userData = await ax.get('/api/users/profile/');

    console.log(userData.data);

    return userData.data;
  }
  catch (error) {
    PageLoadError(error);
  }
};