import {StyleSheet} from 'react-native';
import {primary, tertiary} from './colors';

export default StyleSheet.create({
  container: {flex: 1, justifyContent: 'center'},
  title: {flex: 1, alignItems: 'center', justifyContent: 'flex-end'},
  textTitle: {
    color: primary,
    fontWeight: 'bold',
    fontSize: 35,
  },
  containerLogo: {flex: 4, justifyContent: 'center', alignItems: 'center'},
  logo: {width: '75%', height: '75%', resizeMode: 'contain'},
  containerLoginMethods: {alignItems: 'center', flex: 4},
  signupButton: {
    backgroundColor: tertiary,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 15,
    width: '85%',
  },
  signinButton: {
    backgroundColor: primary,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 15,
    width: '85%',
  },
  loginButtonText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#fafafa',
    alignSelf: 'center',
  },
  googleButton: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 20,
  },
  googleIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginTop: 7,
    marginBottom: 7,
  },
  googleButtonText: {
    fontSize: 18,
    marginLeft: 15,
    color: primary,
  },
  linesLeft: {
    backgroundColor: primary,
    height: 2,
    flex: 1,
    alignSelf: 'center',
    marginLeft: 25,
    marginRight: 5,
  },
  linesRight: {
    backgroundColor: primary,
    height: 2,
    flex: 1,
    alignSelf: 'center',
    marginRight: 25,
    marginLeft: 5,
  },
  textBetweenLines: {
    alignSelf: 'center',
    paddingHorizontal: 5,
    fontSize: 20,
    color: primary,
  },
});
