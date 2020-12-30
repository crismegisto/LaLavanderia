import {
  sandbox,
  production,
  pub_test,
  prv_test,
  pub_prod,
  prv_prod,
} from '../../keys';

export const getFinancialInstitutions = async () => {
  const response = await fetch(production + '/pse/financial_institutions', {
    method: 'GET',
    headers: {
      Accept: '*/*',
      'content-type': 'application/json',
      Authorization: 'Bearer ' + pub_prod,
    },
  });
  const results = await response.json();

  const modifyResults = results.data
    .filter((item) => item.financial_institution_code !== '0')
    .map((item) => ({
      value: item.financial_institution_code,
      label: item.financial_institution_name,
    }));

  return modifyResults;
};
