import {
  sandbox,
  production,
  pub_test,
  prv_test,
  pub_prod,
  prv_prod,
} from '../../keys';

export const getAcceptanceToken = async () => {
  const response = await fetch(sandbox + '/merchants/' + pub_test);
  const results = await response.json();
  return results.data.presigned_acceptance.acceptance_token;
};

export const createTransaction = async (acceptanceToken, data) => {
  const date = Date.now();
  const response = await fetch(sandbox + '/transactions', {
    method: 'POST',
    headers: {
      Accept: '*/*',
      'content-type': 'application/json',
      Authorization: 'Bearer ' + pub_test,
    },
    body: JSON.stringify({
      acceptance_token: acceptanceToken,
      amount_in_cents: 150000,
      currency: 'COP',
      customer_email: 'cristianrch123@gmail.com',
      payment_method: data,
      reference: 'LALAVANDERIA' + date,
      customer_data: {
        phone_number: '573307654321',
        full_name: 'Alvaro Forero',
      },
      shipping_address: {
        address_line_1: 'Calle 34 # 56 - 78',
        address_line_2: 'Apartamento 502, Torre I',
        country: 'CO',
        region: 'Cundinamarca',
        city: 'Bogotá',
        name: 'Pepe Perez',
        phone_number: '573109999999',
      },
    }),
  });

  return await response.json();
};

export const checkTransaction = async (id) => {
  let response = await fetch(sandbox + '/transactions/' + id);
  const results = await response.json();
  console.log(results);
  return results.data;
};
