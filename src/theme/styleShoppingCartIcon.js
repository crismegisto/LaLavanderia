import {StyleSheet} from 'react-native';
import {sextenary} from './colors';

export default StyleSheet.create({
  container: {
    padding: 5,
  },
  iconContainer: {
    paddingLeft: 20,
    paddingTop: 10,
    marginRight: 5,
  },
  counter: {
    position: 'absolute',
    height: 25,
    width: 25,
    borderRadius: 15,
    backgroundColor: 'rgba(220,44,44,0.7)',
    right: 15,
    bottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
  },
  counterText: {
    color: sextenary,
    fontWeight: 'bold',
    fontSize: 12,
  },
});
