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
    const {success} = await response.json();
    if (!success) {
      throw new Error('Lo sentimos, el usuario no ha sido creado.');
    } else {
      return true;
    }
  }

  throw new Error('Lo sentimos, ha ocurrido un error interno.');
};
