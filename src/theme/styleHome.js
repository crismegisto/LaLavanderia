import {StyleSheet} from 'react-native';
import {primary, secondary, sextenary} from './colors';

export default StyleSheet.create({
  separator: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  bottom: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 7,
    marginHorizontal: 10,
    backgroundColor: secondary,
  },
  textBottom: {
    color: primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
