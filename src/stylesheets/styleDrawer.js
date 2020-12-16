import {StyleSheet} from 'react-native';

export default StyleSheet.create({
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
    marginTop: 3,
    fontWeight: 'bold',
    color: 'black',
  },
  titleItem: {
    fontSize: 18,
    color: 'black',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    color: 'white',
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 25,
    justifyContent: 'center',
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  partingLine: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
});
