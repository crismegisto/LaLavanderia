export const requestCategories = () => ({
  type: 'REQUEST_CATEGORIES',
});

export const receiveCategories = (data) => ({
  type: 'RECEIVE_CATEGORIES',
  payload: data,
});

export const invalidateCategories = () => ({
  type: 'INVALIDATE_CATEGORIES',
});

export const fetchCategories = () => {
  let url =
    'https://my-json-server.typicode.com/Cristianr1/fakeJSON/categories';
  return async (dispatch) => {
    dispatch(requestCategories());
    try {
      let response = await fetch(url);
      let results = await response.json();
      dispatch(receiveCategories(results));
    } catch (err) {
      dispatch(invalidateCategories(err.message));
    }
  };
};
