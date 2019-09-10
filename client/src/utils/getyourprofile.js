// FUNCTIONS
import ax from 'axios';
import PageLoadError from './pageloaderror';

export default async function GetYourProfile() {
  try {
    const userData = await ax.get('/api/users/profile');

    // console.log(userData.data);

    if (!userData.data) { // couldn't find that user so log them out
      await ax.get('/api/users/logout');
    }

    return userData.data;
  }
  catch (error) {
    PageLoadError(error);
  }
};
