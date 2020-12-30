import {ipAddress} from '../keys';

export const getCoverPage = async () => {
  let url = `http://${ipAddress}/lalavanderia/public/api/portada`;
  try {
    let response = await fetch(url);
    let results = await response.json();
    return results;
  } catch (err) {
    console.log(err.message);
  }
};
