const initialState = {
  isFetching: false,
  didInvalidate: false,
  categoriesData: null,
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_CATEGORIES':
      return {...state, isFetching: true};
    case 'RECEIVE_CATEGORIES':
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        categoriesData: action.payload,
      };
    case 'INVALIDATE_CATEGORIES':
      return {...state, isFetching: false, didInvalidate: true};
    default:
      return state;
  }
};

export default categoriesReducer;
