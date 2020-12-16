const navigationReducer = (state = [], action) => {
  switch (action.type) {
    case 'SAVE_NAVIGATION':
      return [action.state];
    case 'DELETE_NAVIGATION':
      return [];
    default:
      return state;
  }
};

export default navigationReducer;
