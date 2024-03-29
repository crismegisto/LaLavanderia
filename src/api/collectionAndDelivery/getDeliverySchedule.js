import {ipAddress} from '../../keys';

export const getDeliverySchedule = async (zone, id, reception) => {
  const extraQuery = reception ? '&p=1' : '';
  let url =
    `http://${ipAddress}/lalavanderia/public/api/horarios?t=E&zona=${zone}&fh=${id}` +
    extraQuery;
  try {
    let response = await fetch(url);
    let results = await response.json();
    return results;
  } catch (err) {
    console.log(err.message);
  }
};
