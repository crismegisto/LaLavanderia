import {StyleSheet} from 'react-native';
import {primary, sextenary} from './colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(39,34,65,0.8)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '95%',
  },
  formTitle: {
    alignSelf: 'center',
    marginBottom: 10,
    fontSize: 18,
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
