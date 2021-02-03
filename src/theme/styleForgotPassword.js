import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  btnBack: {position: 'absolute', top: 3, left: 3, padding: 6},
  text: {alignSelf: 'flex-start', marginLeft: 20, fontSize: 20},
  btnSendPassword: {
    backgroundColor: '#02193E',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
    width: '80%',
  },
  textSendPassword: {
    fontSize: 18,
    color: '#fafafa',
    alignSelf: 'center',
  },
});
