import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  stepsContainer: {
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
    marginBottom: 15,
    fontSize: 16,
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#02193E',
    paddingVertical: 12,
    borderRadius: 10,
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
    marginTop: 10,
    backgroundColor: 'white',
    margin: 7,
    borderRadius: 10,
  },
});
