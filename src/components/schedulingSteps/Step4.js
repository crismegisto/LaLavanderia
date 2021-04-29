import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, TextInput, Text, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import {primary, secondary, tertiary, sextenary} from '../../theme/colors';
import geocoding from '../../api/geocoding';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Step4 = (props) => {
  return (
    <KeyboardAwareScrollView>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          marginVertical: 10,
          marginLeft: 10,
        }}>
        Observaciones
      </Text>
      <TextInput
        style={{
          backgroundColor: sextenary,
          fontSize: 16,
          borderRadius: 30,
          width: '90%',
          height: 200,
          alignSelf: 'center',
          borderColor: 'black',
          borderWidth: 2,
        }}
        onChangeText={(value) => props.getObservations(value)}
        placeholder={'Ingresar Observaciones'}
        // value={newAddress}
        maxLength={30}
        multiline
        numberOfLines={5}
      />
    </KeyboardAwareScrollView>
  );
};

export default Step4;
