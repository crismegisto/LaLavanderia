import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  productsContainer: {
    flex: 3,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  totalText: {fontWeight: 'bold', fontSize: 18},
  nextButton: {
    backgroundColor: '#02193E',
    paddingVertical: 12,
    borderRadius: 30,
    marginBottom: 10,
    marginTop: 10,
    width: '40%',
    alignSelf: 'center',
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    alignSelf: 'center',
  },
});
