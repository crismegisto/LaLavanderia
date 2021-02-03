import React from 'react';
import {SocialIcon} from 'react-native-elements';
import styles from '../../stylesheets/styleSignIn';

const SignInFacebook = () => {
  return (
    <SocialIcon
      style={styles.iconFacebook}
      type="facebook"
      onPress={() => console.log('pressFacebook')}
    />
  );
};

export default SignInFacebook;
