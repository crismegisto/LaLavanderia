import {pub_test, prv_test} from '../keys';

export const tokenCard = async () => {
  const response = await fetch('https://sandbox.wompi.co/v1/tokens/cards', {
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

  if (results.status) {
    return results.data.id;
  }

  if (results.error) {
    throw new Error(results.error.messages.number[0]);
  }

  throw new Error(results);
};

export const getTransactionStatus = async () => {
  const response = await fetch(
    'https://sandbox.wompi.co/v1/merchants/' + pub_test,
  );
  const results = await response.json();
  return results.data.presigned_acceptance.acceptance_token;
};
