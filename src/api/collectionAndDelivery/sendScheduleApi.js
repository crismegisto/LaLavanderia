import {ipAddress} from '../../keys';

export const sendSchedule = async (uid, data, delivery, collection) => {
    console.log(uid, data, delivery, collection);
  const response = await fetch(
    `http://${ipAddress}/lalavanderia/public/api/servicios?lista=2&cliente=${uid}&entrega=${delivery.id}&recogida=${collection.id}`,
    {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(data),
    },
  );

  const results = await response.json();
  console.log(results);
};
