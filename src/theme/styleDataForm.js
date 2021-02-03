import {StyleSheet} from 'react-native';
import {primary, sextenary} from './colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container1: {
    flex: 1,
    justifyContent: 'space-between',
  },
  formContainer: {
    marginTop: 20,
  },
  formTitle: {
    alignSelf: 'center',
    marginLeft: 30,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonBack: {
    position: 'absolute',
    top: 3,
    left: 3,
    padding: 6,
  },
  button: {
    backgroundColor: primary,
    alignItems: 'center',
    paddingVertical: 10,
    width: '40%',
    alignSelf: 'center',
    borderRadius: 30,
  },
  buttonText: {
    color: sextenary,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
