const productsReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return [...state, action.product];
    case 'ADD_PRODUCT_UNIT':
      return state.map((item) =>
        action.id === item.id ? {...item, quantity: ++item.quantity} : item,
      );
    case 'REMOVE_PRODUCT_UNIT':
      return state.map((item) =>
        action.id === item.id ? {...item, quantity: --item.quantity} : item,
      );
    case 'DELETE_PRODUCT':
      return state.filter((item) => item.id !== action.id);
    case 'DELETE_M_PRODUCT':
      return state.filter((item) => item.auxiliaryId !== action.id);
    case 'REMOVE_ALL_PRODUCTS':
      return [];
    default:
      return state;
  }
};

export default productsReducer;
