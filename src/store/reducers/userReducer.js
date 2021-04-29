const initialState = {
  displayName: null,
  photo: 'https://picsum.photos/id/111/200/200',
  firstName: null,
  lastName: null,
  email: '',
  phoneNumber: null,
  addresses: [],
  documentType: 'C.C.',
  document: null,
  code: 1,
  uid: null,
};

const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FILL_IN_THE_DATA':
      return {
        ...state,
        ...action.payload,
      };
    case 'ADD_ADDRESS':
      const newArray = state.addresses.map((address) => ({
        ...address,
        isSelected: false,
      }));
      return {
        ...state,
        addresses: [...newArray, action.payload],
      };
    case 'REMOVE_ADDRESS':
      return {
        ...state,
        addresses: state.addresses.filter(
          (address) => address.id !== action.id,
        ),
      };
    case 'CHANGE_SELECTED_ADDRESS':
      return {
        ...state,
        addresses: state.addresses.map((address) =>
          address.id === action.id
            ? {...address, isSelected: true}
            : {...address, isSelected: false},
        ),
      };
    case 'SIGN_OUT':
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default userDataReducer;
