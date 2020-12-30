import {
  sandbox,
  production,
  pub_test,
  prv_test,
  pub_prod,
  prv_prod,
} from '../../keys';

export const tokenCard = async (data) => {
  const response = await fetch(sandbox + '/tokens/cards', {
    method: 'POST',
    headers: {
      Accept: '*/*',
      'content-type': 'application/json',
      Authorization: 'Bearer ' + pub_test,
    },
    body: JSON.stringify({
      number: '4242424242424242',
      cvc: '789',
      exp_month: '12',
      exp_year: '29',
      card_holder: 'Pedro Pérez',
    }),
  });

  const results = await response.json();
  console.log(results);
};
