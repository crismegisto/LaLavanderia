const initialState = [
  {
    id: 1,
    type: 'Nequi',
    wompiData: {type: 'NEQUI', phone_number: ''},
    active: true,
  },
  {
    id: 2,
    type: 'PSE',
    wompiData: {
      type: 'PSE',
      user_type: 0, // Tipo de persona, natural (0) o jurídica (1)
      user_legal_id_type: '', // Tipo de documento, CC o NIT
      user_legal_id: '', // Número de documento
      financial_institution_code: '', // Código (`code`) de la institución financiera
      payment_description: 'Pago a Tienda Wompi, ref: JD38USJW2XPLQA', // Nombre de lo que se está pagando. Máximo 30 caracteres
    },
    active: false,
  },
  {
    id: 3,
    type: 'Tarjeta Crédito',
    wompiData: {
      type: 'CARD',
      installments: null, // Número de cuotas
      token: '', // Token de la tarjeta de crédito
    },
    active: false,
  },
];

const paymentMethodsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MODIFY_PAYMENT_METHOD':
      return state.map((item) =>
        action.paymentId === item.id
          ? {...item, active: true}
          : {...item, active: false},
      );
    case 'UPDATE_WOMPI':
      return state.map((item) =>
        action.paymentId === item.id
          ? {...item, wompiData: action.wompiData}
          : item,
      );
    default:
      return state;
  }
};

export default paymentMethodsReducer;
