/* eslint-disable no-undef */
import React, {useEffect} from 'react';
import {SocialIcon} from 'react-native-elements';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import styles from '../stylesheets/styleSignIn';

const SignInGoogle = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '116367892117-isbthflid9qf4gterjf1lf9qrnfe3f6o.apps.googleusercontent.com',
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();

      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <SocialIcon style={styles.iconGoogle} type="google" onPress={signIn} />
  );
};

export default SignInGoogle;
