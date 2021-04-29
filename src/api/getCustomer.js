import {ipAddress} from '../keys';

const getCustomer = async (customer) => {
  let url = `http://${ipAddress}/lalavanderia/public/api/clientes/${customer}`;

  let response = await fetch(url);
  let results = await response.json();
  let parseResult = {
    firstName: results.cliente_nombres,
    lastName: results.cliente_apellidos,
    phoneNumber: results.cliente_telefono,
    document: results.cliente_documento,
  };

  return parseResult;
};

export default getCustomer;
