import React, {useState, useEffect} from 'react';
import {
  Modal,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const MeasurementsModal = (props) => {
  const [widthRug, setWidthRug] = useState(null);
  const [lengthRug, setLengthRug] = useState(null);

  const accept = () => {
    props.hideModal();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={props.visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeIcon}>
            <Icon name="times" size={30} color="black" />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 25,
              width: 200,
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Text style={{color: 'black'}}>Ancho</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextInput
                style={{
                  width: 100,
                  height: 40,
                  fontSize: 14,
                  borderColor: 'gray',
                  borderWidth: 1,
                }}
                keyboardType="numeric"
                onChangeText={(text) => setWidthRug(text)}
                value={widthRug}
              />
              <Text style={{color: 'black', marginLeft: 5}}>cm</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 25,
              marginBottom: 10,
              width: 200,
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Text style={{color: 'black'}}>Largo</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextInput
                style={{
                  width: 100,
                  height: 40,
                  fontSize: 14,
                  borderColor: 'gray',
                  borderWidth: 1,
                }}
                keyboardType="numeric"
                onChangeText={(text) => setLengthRug(text)}
                value={lengthRug}
              />
              <Text style={{color: 'black', marginLeft: 5}}>cm</Text>
            </View>
          </View>
          <Text>Valor a pagar ${(widthRug * lengthRug * 21000) / 10000}</Text>
          <TouchableHighlight style={styles.openButton} onPress={accept}>
            <Text style={styles.textStyle}>Aceptar</Text>
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
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
  },
  openButton: {
    backgroundColor: 'blue',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 20,
  },
  textStyle: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  successTextStyle: {
    color: 'black',
    marginTop: 25,
    marginBottom: 25,
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default MeasurementsModal;
