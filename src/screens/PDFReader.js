import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Ionicon from 'react-native-vector-icons/AntDesign';
import Pdf from 'react-native-pdf';
import styles from '../theme/styleTermsAndConditions';

const PDFReader = ({navigation}) => {
  const source = {
    uri:
      'https://wompi.co/wp-content/uploads/2019/09/TERMINOS-Y-CONDICIONES-DE-USO-USUARIOS-WOMPI.pdf',
    cache: true,
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBackButton}>
          <Ionicon
            name="arrowleft"
            size={40}
            color="#02193E"
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
        <Text style={styles.title}>LaLavanderia - Wompi</Text>
      </View>
      <></>
      <Pdf source={source} style={styles.pdf} />
    </View>
  );
};

export default PDFReader;
