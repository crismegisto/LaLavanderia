import React from 'react';
import {
  View,
  Modal,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {primary, secondary} from '../theme/colors';
import {useSelector} from 'react-redux';

let {width} = Dimensions.get('window');

const PricesCarousel = (props) => {
  const categories = useSelector((state) => state.categories.categoriesData);

  const renderItem = ({item, index}) => {
    return (
      <Image
        key={index}
        source={{uri: item.categoria_imagen_ruta}}
        style={{
          height: 470,
          resizeMode: 'stretch',
          borderRadius: 20,
          justifyContent: 'center',
          marginTop: 30,
        }}
      />
    );
  };
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={props.isVisible}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'rgba(39,34,65,0.8)',
          }}>
          {categories && (
            <Carousel
              data={categories}
              renderItem={renderItem}
              sliderWidth={width}
              itemWidth={width - 70}
            />
          )}
          <View style={{flex: 2, alignItems: 'center'}}>
            <TouchableOpacity style={styles.bottom} onPress={props.hideModal}>
              <Text style={styles.textBottom}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  bottom: {
    backgroundColor: secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    width: '45%',
    height: 40,
    marginTop: 10,
  },
  textBottom: {
    color: primary,
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default PricesCarousel;
