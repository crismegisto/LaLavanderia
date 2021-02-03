import {StyleSheet} from 'react-native';
import {primary, sextenary} from './colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerContent: {
    flex: 4,
  },
  userInfoSection: {
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: primary,
  },
  titleItem: {
    fontSize: 18,
    color: primary,
  },
  drawerSection: {
    marginTop: 25,
  },
  dividingLine: {
    borderBottomColor: sextenary,
    borderBottomWidth: 2,
  },
});
