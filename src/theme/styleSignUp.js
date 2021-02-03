import {StyleSheet} from 'react-native';
import {primary} from './colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonBack: {
    position: 'absolute',
    top: 3,
    left: 3,
    padding: 6,
  },
  title: {
    marginBottom: 20,
    fontSize: 18,
    color: primary,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: primary,
    alignItems: 'center',
    paddingVertical: 10,
    margin: 20,
    width: '40%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
