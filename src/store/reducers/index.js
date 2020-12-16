import {combineReducers} from 'redux';
import productsReducer from './productsReducer';
import userDataReducer from './userDataReducer';
import categoriesReducer from './categoriesReducer';
import balanceReducer from './balanceReducer';
import transactionReducer from './transactionReducer';
import navigationReducer from './navigationReducer';

const rootReducer = combineReducers({
  productsInCart: productsReducer,
  userData: userDataReducer,
  categories: categoriesReducer,
  balance: balanceReducer,
  transaction: transactionReducer,
  navigation: navigationReducer,
});

export default rootReducer;
