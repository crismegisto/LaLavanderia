import {ipAddress} from '../../keys';

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

export const reviewedCategory = (id) => ({
  type: 'REVIEWED_CATEGORY',
  id,
});

export const allReviewed = () => ({
  type: 'ALL_REVIEWED',
});

export const fetchCategories = () => {
  let url = `http://${ipAddress}/lalavanderia/public/api/categorias`;
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
