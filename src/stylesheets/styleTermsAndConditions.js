import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  pdf: {
    flex: 1,
  },
  header: {
    height: 50,
    alignItems: 'center',
    backgroundColor: '#98D7E8',
    justifyContent: 'center',
  },
  goBackButton: {
    flex: 1,
    position: 'absolute',
    left: 5,
    top: 5,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    color: '#02193E',
  },
  textTermsAndConds: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
