import {ipAddress} from '../keys';

export const createClient = async (data) => {
  const response = await fetch(
    `http://${ipAddress}/lalavanderia/public/api/clientes`,
    {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(data),
    },
  );

  if (response.status === 200) {
    return await response.json();
  }
};
