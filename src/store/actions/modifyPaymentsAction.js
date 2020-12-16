export const modifyPayments = (paymentId) => ({
  type: 'MODIFY_PAYMENTS',
  paymentId,
});

export const updateWompiData = (paymentId, wompiData) => ({
  type: 'UPDATE_WOMPI',
  paymentId,
  wompiData,
});
