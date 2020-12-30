import {ipAddress} from '../../keys';

export const getCollection = async () => {
  let url = `http://${ipAddress}/lalavanderia/public/api/horarios?t=R`;
  try {
    let response = await fetch(url);
    let results = await response.json();
    return results;
  } catch (err) {
    console.log(err.message);
  }
};
