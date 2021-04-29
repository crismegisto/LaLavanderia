import {combineReducers} from 'redux';
import productsReducer from './productsReducer';
import userReducer from './userReducer';
import categoriesReducer from './categoriesReducer';
import balanceReducer from './balanceReducer';
import transactionReducer from './transactionReducer';
import navigationReducer from './navigationReducer';
import paymentMethodsReducer from './paymentMethodsReducer';

const rootReducer = combineReducers({
  productsInCart: productsReducer,
  user: userReducer,
  categories: categoriesReducer,
  balance: balanceReducer,
  transaction: transactionReducer,
  navigation: navigationReducer,
  paymentMethods: paymentMethodsReducer,
});

export default rootReducer;
