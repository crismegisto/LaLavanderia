export const modifyPaymentMethod = (paymentId) => ({
  type: 'MODIFY_PAYMENT_METHOD',
  paymentId,
});

export const updateWompiData = (paymentId, wompiData) => ({
  type: 'UPDATE_WOMPI',
  paymentId,
  wompiData,
});
