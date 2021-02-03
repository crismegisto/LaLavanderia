import {StyleSheet} from 'react-native';
import {primary} from '../theme/colors';

export default StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
  },
  stepsContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 7,
  },
  scheduleIcon: {
    alignSelf: 'center',
    marginTop: 7,
  },
  progressBar: {
    alignSelf: 'center',
    flexDirection: 'row',
    height: 30,
    width: '80%',
    backgroundColor: 'white',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 5,
    marginTop: 15,
    marginBottom: 8,
  },
  stepCounter: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: primary,
    paddingVertical: 12,
    borderRadius: 30,
    marginBottom: 15,
    marginTop: 15,
    width: '60%',
    alignSelf: 'center',
  },
  textContinueButton: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    alignSelf: 'center',
  },
  productsContainer: {
    flex: 1,
    borderRadius: 10,
  },
});
