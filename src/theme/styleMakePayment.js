import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  containerScrollView: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  payment: {
    flex: 1,
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
    backgroundColor: '#02193E',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 7,
    width: '60%',
    alignSelf: 'center',
  },
  paymentButtonDisable: {
    backgroundColor: 'gray',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 7,
    width: '60%',
    alignSelf: 'center',
  },
  paymentButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    alignSelf: 'center',
  },
});
