/* eslint-disable react/prop-types */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

Icon.loadFont();

const AddRemoveButton = (props) => {
  return (
    <View style={styles.container}>
      <View style={{marginLeft: 10}}>
        <Icon
          name="ios-remove"
          size={40}
          color="black"
          onPress={props.remove}
        />
      </View>
      <Text style={styles.text}>{props.quantity}</Text>
      <View style={{marginRight: 10}}>
        <Icon name="ios-add" size={40} color="black" onPress={props.add} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 100,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 2,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddRemoveButton;
