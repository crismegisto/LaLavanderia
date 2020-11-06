const initialState = {
  user: {
    name: 'Emmanuel Goldstein', // full name
    email: '',
    phoneNumber: null,
    photo: 'https://picsum.photos/id/111/200/200', // url
    uid: '',
    address: null,
  },
  payment: [
    {id: 1, type: 'cash', number: '', active: true},
    {id: 2, type: 'visa', number: '1234 9876', active: false},
  ],
};

const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...state,
        user: {...action.userData},
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
    case 'ADD_CARD':
      return {
        ...state,
        payment: [...state.payment, {...action.payment}],
      };
    default:
      return state;
  }
};

export default userDataReducer;
