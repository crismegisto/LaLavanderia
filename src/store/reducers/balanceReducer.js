const initialState = {
  isFetching: false,
  didInvalidate: false,
  balanceUser: null,
};

const balanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_BALANCE':
      return {...state, isFetching: true};
    case 'RECEIVE_BALANCE':
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        balanceUser: action.payload,
      };
    case 'INVALIDATE_BALANCE':
      return {...state, isFetching: false, didInvalidate: true};
    default:
      return state;
  }
};

export default balanceReducer;
