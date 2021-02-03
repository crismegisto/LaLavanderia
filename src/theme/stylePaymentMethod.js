import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  activeMethod: {
    borderColor: '#02193E',
    borderWidth: 3,
    borderRadius: 10,
    marginVertical: 10,
    height: 80,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedLogo: {
    height: 50,
    width: 50,
    margin: 10,
  },
});
