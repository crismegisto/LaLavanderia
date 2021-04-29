export const fillInTheData = (userData) => ({
  type: 'FILL_IN_THE_DATA',
  payload: userData,
});

export const signOut = () => ({
  type: 'SIGN_OUT',
});
