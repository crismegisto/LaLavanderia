import {ipAddress} from '../../keys';

export const getDelivery = async () => {
  let url = `http://${ipAddress}/lalavanderia/public/api/horarios?t=E`;
  try {
    let response = await fetch(url);
    let results = await response.json();
    return results;
  } catch (err) {
    console.log(err.message);
  }
};
