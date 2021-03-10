import {StyleSheet} from 'react-native';
import {primary} from './colors';

export default StyleSheet.create({
  container: {flex: 1, alignItems: 'stretch'},
  containerCarousel: {flex: 3, marginTop: 8},
  containerButtons: {flex: 1},
  rowOfButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 3,
    borderColor: primary,
    marginTop: 7,
    marginHorizontal: 10,
    backgroundColor: 'white',
  },
  textButton: {
    color: primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    width: 35,
    height: 35,
    marginRight: 7,
  },
});
