import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {primary} from '../../theme/colors';

const FormFieldWithIcon = (props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(!props.isPassword);
  return (
    <View>
      <View
        style={
          !props.errorMessage
            ? styles.container
            : {...styles.container, borderColor: 'red', borderWidth: 2}
        }>
        <FontAwesome name={props.iconName} size={24} color={primary} />
        <TextInput
          style={styles.textInput}
          placeholder={props.fieldName}
          autoCapitalize={props.autoCapitalize}
          secureTextEntry={!isPasswordVisible}
          maxLength={35}
          onChangeText={(text) => props.onChangeText(text)}
        />
        {props.isPassword && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            {isPasswordVisible ? (
              <Entypo name="eye-with-line" size={24} color={primary} />
            ) : (
              <Entypo name="eye" size={24} color={primary} />
            )}
          </TouchableOpacity>
        )}
      </View>

      <View style={{width: '80%'}}>
        <Text style={{color: 'red'}}>{props.errorMessage}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ececec',
    alignItems: 'center',
    width: '88%',
    height: 50,
    paddingHorizontal: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 16,
  },
});

export default FormFieldWithIcon;
