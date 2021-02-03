import {ipAddress} from '../keys';

export const getCustomerData = async (customer) => {
  let url = `http://${ipAddress}/lalavanderia/public/api/clientes/${customer}`;

  let response = await fetch(url);
  let results = await response.json();
  let parseResult = {
    firstName: results.cliente_nombres,
    lastName: results.cliente_apellidos,
    phoneNumber: results.cliente_telefono,
    address1: results.cliente_direccion1,
    address2: results.cliente_direccion2,
    address3: results.cliente_direccion3,
    document: results.cliente_documento,
  };

  return parseResult;
};
