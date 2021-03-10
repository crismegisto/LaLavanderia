import React from 'react';
import {View} from 'react-native';
import Pdf from 'react-native-pdf';
import styles from '../theme/styleTermsAndConditions';

const PDFReader = () => {
  const source = {
    uri:
      'https://wompi.co/wp-content/uploads/2019/09/TERMINOS-Y-CONDICIONES-DE-USO-USUARIOS-WOMPI.pdf',
    cache: true,
  };

  return (
    <View style={styles.container}>
      <Pdf source={source} style={styles.pdf} />
    </View>
  );
};

export default PDFReader;
