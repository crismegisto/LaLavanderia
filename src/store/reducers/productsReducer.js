const productsReducer = (state = [], action) => {
  switch (action.type) {
    case 'TOGGLE_PRODUCT':
      return [...state, action.product];
    case 'ADD_UNIT_TO_PRODUCT':
      return state.map((item) =>
        action.id === item.id ? {...item, quantity: ++item.quantity} : item,
      );
    case 'REMOVE_UNIT_TO_PRODUCT':
      return state.map((item) =>
        action.id === item.id ? {...item, quantity: --item.quantity} : item,
      );
    case 'ELIMINATE_PRODUCT':
      return state.filter((item) => item.id !== action.id);
    case 'REMOVE_ALL_PRODUCTS':
      return [];
    default:
      return state;
  }
};

export default productsReducer;
