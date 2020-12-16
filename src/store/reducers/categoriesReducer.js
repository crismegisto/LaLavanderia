const initialState = {
  isFetching: false,
  didInvalidate: false,
  categoriesData: null,
  isReviewCompleted: false,
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
        categoriesData: action.payload.map((item) => ({
          ...item,
          isReviewed: false,
        })),
      };
    case 'INVALIDATE_CATEGORIES':
      return {...state, isFetching: false, didInvalidate: true};
    case 'REVIEWED_CATEGORY':
      return {
        ...state,
        categoriesData: state.categoriesData.map((item) =>
          action.id === item.id ? {...item, isReviewed: true} : item,
        ),
      };
    case 'ALL_REVIEWED':
      return {
        ...state,
        isReviewCompleted: true,
      };
    default:
      return state;
  }
};

export default categoriesReducer;
