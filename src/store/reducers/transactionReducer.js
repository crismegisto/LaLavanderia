const transactionReducer = (state = [], action) => {
  switch (action.type) {
    case 'SAVE_TRANSACTION':
      return [action.id];
    case 'DELETE_TRANSACTION':
      return [];
    default:
      return state;
  }
};

export default transactionReducer;
