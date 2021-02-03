import {apiKeyGoogle} from '../keys';

const geocoding = async (query) => {
  try {
    let encodedString = encodeURIComponent(query);
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedString}&key=${apiKeyGoogle}`,
    );
    const {results} = await response.json();
    return results[0].geometry.location;
  } catch (err) {
    return null;
  }
};

export default geocoding;
