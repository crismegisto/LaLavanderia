import React from 'react';
import {Text} from 'react-native';
import styles from '../theme/styleTermsAndConditions';

const TermsAndConditions = ({navigation}) => {
  return (
    <Text
      style={styles.textTermsAndConds}
      onPress={() => navigation.navigate('TermsAndConditions')}>
      términos y condiciones y la política de privacidad
    </Text>
  );
};

export default TermsAndConditions;
