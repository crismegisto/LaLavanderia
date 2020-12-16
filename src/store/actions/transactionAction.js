export const saveTransaction = (id) => ({
  type: 'SAVE_TRANSACTION',
  id,
});

export const deleteTransaction = () => ({
  type: 'DELETE_TRANSACTION',
});
