import React from 'react';
import {Modal, Text, View, TouchableHighlight, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SuccessModal = (props) => {
  const accept = () => {
    props.modalVisible();
    props.navigation.navigate('Home');
  };

  return (
    <Modal animationType="slide" transparent={true} visible={props.openModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Icon name="check-circle" size={50} color="white" />

          <Text style={styles.successTextStyle}>Transacción Exitosa</Text>

          <TouchableHighlight style={styles.openButton} onPress={accept}>
            <Text style={styles.textStyle}>Continuar</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#5AA63C',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
  },
  openButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    fontSize: 16,
    color: '#5AA63C',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  successTextStyle: {
    marginTop: 10,
    marginBottom: 25,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SuccessModal;
