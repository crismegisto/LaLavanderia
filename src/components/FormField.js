import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const FormField = (props) => {
  const [registry, setRegistry] = useState('');

  useEffect(() => {
    props.setRegistry(registry);
  }, [registry, props]);

  const handleFormChange = (text) => {
    let newText;
    if (props.title === 'Dirección') {
      return setRegistry(text);
    }

    if (props.title === 'Nombres' || props.title === 'Apellidos') {
      newText = text.replace(/[^a-zA-Z ]/g, '');
    } else {
      newText = text.replace(/[^0-9 ]/g, '').replace(/\s/g, '');
    }

    setRegistry(newText);
  };

  return (
    <View
      style={{
        alignItems: 'center',
        marginBottom: 15,
      }}>
      <View
        style={
          registry.length === 0 && props.showError
            ? [styles.container, {borderColor: 'red', borderWidth: 2}]
            : styles.container
        }>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>{props.title}</Text>
        <TextInput
          style={styles.textInput}
          keyboardType={props.keyboardType}
          autoCapitalize="words"
          maxLength={props.maxLength}
          placeholder={`Introduzca ${props.title}`}
          value={registry}
          onChangeText={(text) => handleFormChange(text)}
        />
      </View>
      {props.showError && registry.length === 0 && (
        <Text style={{alignSelf: 'flex-end', marginRight: 20, color: 'red'}}>
          Campo Requerido
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#C8D6DE',
    width: '95%',
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {fontSize: 16},
});

export default FormField;
