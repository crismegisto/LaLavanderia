const initialState = {
  user: {
    displayName: null,
    photo: 'https://picsum.photos/id/111/200/200',
    firstName: null,
    lastName: null,
    email: '',
    phoneNumber: null,
    address1: null,
    complementAddress1: null,
    address2: null,
    complementAddress2: null,
    address3: null,
    complementAddress3: null,
    documentType: 'C.C.',
    document: null,
    code: 1,
    uid: null,
  },
  paymentMethods: [
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
  ],
};

const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...state,
        user: {...state.user, ...action.userData},
      };
    case 'FILL_OUT_DATA':
      return {
        ...state,
        user: {...state.user, ...action.userData},
      };
    case 'ADD_PHONE_NUMBER':
      return {
        ...state,
        user: {...state.user, phoneNumber: action.phoneNumber},
      };
    case 'SIGN_OUT':
      return {
        ...initialState,
      };
    case 'MODIFY_PAYMENT_METHOD':
      return {
        ...state,
        paymentMethods: state.paymentMethods.map((item) =>
          action.paymentId === item.id
            ? {...item, active: true}
            : {...item, active: false},
        ),
      };
    case 'UPDATE_WOMPI':
      return {
        ...state,
        paymentMethods: state.paymentMethods.map((item) =>
          action.paymentId === item.id
            ? {...item, wompiData: action.wompiData}
            : item,
        ),
      };
    default:
      return state;
  }
};

export default userDataReducer;
