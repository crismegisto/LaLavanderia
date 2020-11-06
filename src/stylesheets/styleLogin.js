import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  btnBack: {position: 'absolute', top: 3, left: 3, padding: 6},
  btnLogin: {
    backgroundColor: '#02193E',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
    width: '85%',
  },
  textBtnLogin: {
    fontSize: 18,
    color: '#fafafa',
    alignSelf: 'center',
  },
  containerInput: {
    flexDirection: 'row',
    backgroundColor: '#C8D6DE',
    alignItems: 'center',
    width: '85%',
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  textInput: {flex: 1, paddingLeft: 10, fontSize: 16},
  btnForgotPassword: {marginTop: 20, width: '85%', alignItems: 'center'},
  textBtnForgotPassword: {color: '#02193E', fontSize: 16},
  btnSecurePassword: {padding: 8},
});
