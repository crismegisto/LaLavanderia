import {ipAddress} from '../keys';

export const getZones = async () => {
  let url = `http://${ipAddress}/lalavanderia/public/api/zonas`;
  let response = await fetch(url);
  let results = await response.json();
  return results;
};
