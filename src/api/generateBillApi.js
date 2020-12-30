import {ipAddress} from '../keys';

export const generateBill = async (client, data) => {
  const response = await fetch(
    `http://${ipAddress}/lalavanderia/public/api/facturas?lista=2&punto=1&cliente=${client}`,
    {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(data),
    },
  );
  const results = await response.json();
  // if (response.status === 200) {
  //   return await response.json();
  // }
};
