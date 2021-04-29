import {StyleSheet} from 'react-native';
import {primary} from './colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  containerScrollView: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  payment: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  termsAndConditions: {
    width: '90%',
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
  },
  paymentButton: {
    backgroundColor: primary,
    paddingVertical: 12,
    borderRadius: 30,
    marginBottom: 10,
    marginTop: 7,
    width: '50%',
    alignSelf: 'center',
  },
  paymentButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    alignSelf: 'center',
  },
  productInCart : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 25,
  },
});
