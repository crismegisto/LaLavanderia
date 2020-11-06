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

export const fetchBalance = () => {
  let url = 'https://my-json-server.typicode.com/Cristianr1/fakeJSON/balance';
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
