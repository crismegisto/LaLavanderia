/* eslint-disable react/prop-types */
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

const EditButton = (props) => {
  return (
    <TouchableOpacity
      style={{
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(220,44,44,0.7)',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 40,
        left: 20,
      }}>
      <Icon name="pencil" size={40} color="white" onPress={props.onPress} />
    </TouchableOpacity>
  );
};

export default EditButton;
