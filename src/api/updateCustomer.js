import {ipAddress} from '../keys';

const updateCustomer = async (uid, data) => {
  const response = await fetch(
    `http://${ipAddress}/lalavanderia/public/api/clientes/${uid}`,
    {
      method: 'PUT',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(data),
    },
  );

  const results = await response.json();
  console.log(results);

//   if (response.status === 200) {
//     const {success} = await response.json();
//     if (!success) {
//       throw new Error('Lo sentimos, el usuario no ha sido creado.');
//     } else {
//       return true;
//     }
//   }

//   throw new Error('Lo sentimos, ha ocurrido un error interno.');
};

export default updateCustomer;
