import {StyleSheet} from 'react-native';
import {sextenary} from './colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  separator: {
    height: 5,
    backgroundColor: sextenary,
  },
  containerCategory: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  beforePaymentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    marginLeft: 15,
  },
  noThanksButton: {
    backgroundColor: '#02193E',
    paddingVertical: 12,
    borderRadius: 30,
    marginBottom: 10,
    marginTop: 10,
    width: '40%',
    alignSelf: 'center',
  },
  noThanksText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    alignSelf: 'center',
  },
});
