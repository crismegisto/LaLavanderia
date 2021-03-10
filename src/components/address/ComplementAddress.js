import React from 'react';
import {Text, TextInput} from 'react-native';
import {secondary} from '../../theme/colors';
import styles from '../../theme/stylesAddress/styleAddAddress';

const ComplementAddress = (props) => {
  return (
    <>
      <Text style={{...styles.subTitle, marginTop: 30}}>
        Detalles Dirección
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => props.onChange(value)}
        placeholder={'p. ej. Apto 401 torre 3'}
        placeholderTextColor={secondary}
        value={props.value}
        maxLength={40}
        textAlign="left"
      />
    </>
  );
};

export default ComplementAddress;
