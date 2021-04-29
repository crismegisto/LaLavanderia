import React, {useState} from 'react';
import {
  Modal,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {addProduct} from '../../store/actions/productsAction';
import {useDispatch} from 'react-redux';

const MeasurementsModal = (props) => {
  const dispatch = useDispatch();
  const [width, setWidth] = useState(null);
  const [length, setLength] = useState(null);

  const accept = () => {
    let area = (width * length) / 10000;
    if (area) {
      let newProduct = {
        ...props.product,
        width,
        length,
        precios: [{precio_valor: (width * length * 21000) / 10000}],
        quantity: 1,
        auxiliaryId: Math.floor(Math.random() * 10000 + 1000),
      };
      dispatch(addProduct(newProduct));
      props.hideModal();
    } else {
      Alert.alert(
        'Error en las medidas',
        'Por favor introduzca medidas diferentes de 0',
      );
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={props.visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeIcon} onPress={props.hideModal}>
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
                onChangeText={(text) => setWidth(text)}
                value={width}
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
                onChangeText={(text) => setLength(text)}
                value={length}
              />
              <Text style={{color: 'black', marginLeft: 5}}>cm</Text>
            </View>
          </View>
          <Text>Valor a pagar ${(width * length * 21000) / 10000}</Text>
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
