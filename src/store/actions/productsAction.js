export const addProduct = (product) => ({
  type: 'ADD_PRODUCT',
  product,
});

export const addProductUnit = (id) => ({
  type: 'ADD_PRODUCT_UNIT',
  id,
});

export const removeProductUnit = (id) => ({
  type: 'REMOVE_PRODUCT_UNIT',
  id,
});

export const deleteProduct = (id) => ({
  type: 'DELETE_PRODUCT',
  id,
});

export const deleteMProduct = (id) => ({
  type: 'DELETE_M_PRODUCT',
  id,
});

export const removeAllProducts = () => ({
  type: 'REMOVE_ALL_PRODUCTS',
});
