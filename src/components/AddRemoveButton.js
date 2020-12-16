/* eslint-disable react/prop-types */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

Icon.loadFont();

const AddRemoveButton = (props) => {
  return (
    <View style={styles.container}>
      <View>
        <Icon
          name="ios-remove"
          size={40}
          color="black"
          onPress={props.remove}
        />
      </View>
      <Text style={styles.text}>{props.quantity}</Text>
      <View>
        <Icon name="ios-add" size={40} color="black" onPress={props.add} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 110,
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
