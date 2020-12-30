export const requestBalance = () => ({
  type: 'REQUEST_BALANCE',
});

export const receiveBalance = (data) => ({
  type: 'RECEIVE_BALANCE',
  payload: data,
});

export const invalidateBalance = () => ({
  type: 'INVALIDATE_BALANCE',
});

export const fetchBalance = (uid) => {
  let url = `http://104.131.86.8/lalavanderia/public/api/saldos?cliente=${uid}`;
  return async (dispatch) => {
    dispatch(requestBalance());
    try {
      let response = await fetch(url);
      let results = await response.json();
      dispatch(receiveBalance(results));
    } catch (err) {
      dispatch(invalidateBalance(err.message));
    }
  };
};
