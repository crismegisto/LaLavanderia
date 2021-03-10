import {ipAddress} from '../../keys';

export const getCollectionSchedule = async (zone, reception) => {
  const extraQuery = reception ? '&p=1' : '';
  let url =
    `http://${ipAddress}/lalavanderia/public/api/horarios?t=R&zona=${zone}` +
    extraQuery;
  try {
    let response = await fetch(url);
    let results = await response.json();
    return results;
  } catch (err) {
    console.log(err.message);
  }
};
