export const addAddress = (address) => ({
  type: 'ADD_ADDRESS',
  payload: address,
});

export const removeAddress = (id) => ({
  type: 'REMOVE_ADDRESS',
  id,
});

export const changeSelectedAddress = (id) => ({
  type: 'CHANGE_SELECTED_ADDRESS',
  id,
});
