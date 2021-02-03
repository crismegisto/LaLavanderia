import {StyleSheet} from 'react-native';
import {secondary} from './colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 100,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: secondary,
    width: 30,
    height: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
