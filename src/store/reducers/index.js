import {combineReducers} from 'redux';
import productsReducer from './productsReducer';
import userDataReducer from './userDataReducer';
import categoriesReducer from './categoriesReducer';
import balanceReducer from './balanceReducer';

const rootReducer = combineReducers({
  productsInCart: productsReducer,
  userData: userDataReducer,
  categories: categoriesReducer,
  balance: balanceReducer,
});

export default rootReducer;
