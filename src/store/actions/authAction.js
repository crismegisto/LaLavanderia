export const signIn = (userData) => ({
  type: 'SIGN_IN',
  userData,
});

export const addPhoneNumber = (phoneNumber) => ({
  type: 'ADD_PHONE_NUMBER',
  phoneNumber,
});

export const signOut = () => ({
  type: 'SIGN_OUT',
});

export const addCard = (payload) => ({
  type: 'ADD_CARD',
  payment: payload,
});
