import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {sextenary} from '../theme/colors';
import styles from '../theme/styleAddRemoveButton';

const AddRemoveButton = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.remove} style={styles.button}>
        <Icon name="ios-remove" size={25} color={sextenary} />
      </TouchableOpacity>
      <Text style={{...styles.text, color: props.textColor}}>
        {props.quantity}
      </Text>
      {props.add && (
        <TouchableOpacity onPress={props.add} style={styles.button}>
          <Icon name="ios-add" size={25} color={sextenary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AddRemoveButton;
