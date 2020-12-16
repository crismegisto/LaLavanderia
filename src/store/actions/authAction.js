export const signIn = (userData) => ({
  type: 'SIGN_IN',
  userData,
});

export const fillOutData = (userData) => ({
  type: 'FILL_OUT_DATA',
  userData,
});

export const addPhoneNumber = (phoneNumber) => ({
  type: 'ADD_PHONE_NUMBER',
  phoneNumber,
});

export const signOut = () => ({
  type: 'SIGN_OUT',
});
