export const toggleProduct = (product) => ({
  type: 'TOGGLE_PRODUCT',
  product,
});

export const addUnitToProduct = (id) => ({
  type: 'ADD_UNIT_TO_PRODUCT',
  id,
});

export const removeUnitToProduct = (id) => ({
  type: 'REMOVE_UNIT_TO_PRODUCT',
  id,
});

export const eliminateProduct = (id) => ({
  type: 'ELIMINATE_PRODUCT',
  id,
});
