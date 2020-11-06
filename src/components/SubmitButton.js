/* eslint-disable react/prop-types */
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const EditButton = (props) => {
  return (
    <TouchableOpacity
      style={{
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(26,137,40,0.7)',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        marginRight: 15,
      }}
      onPress={props.onPress}>
      <Icon name="ios-save" size={40} color="white" />
    </TouchableOpacity>
  );
};

export default EditButton;
