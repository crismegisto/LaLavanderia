import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import MeasurementsModal from '../modals/MeasurementsModal';
import {useSelector, useDispatch} from 'react-redux';
import {primary, quaternary, secondary} from '../../theme/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {eliminateMProduct} from '../../store/actions/productsAction';

const MeasurementsProducts = (props) => {
  const dispatch = useDispatch();

  const [showMeasurements, setShowMeasurements] = useState(false);
  const productsInCart = useSelector((state) => state.productsInCart).filter(
    (product) => product.id === props.products[0].id,
  );

  return (
    <View>
      <MeasurementsModal
        visible={showMeasurements}
        hideModal={() => setShowMeasurements(false)}
        product={props.products[0]}
      />
      <Text style={styles.title}>
        Precio por metro cuadrado ${props.products[0].precios[0].precio_valor}
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowMeasurements(true)}>
        <Text style={styles.textButton}>Agregar</Text>
      </TouchableOpacity>
      <FlatList
        style={{padding: 20}}
        persistentScrollbar
        data={productsInCart}
        keyExtractor={(item) => item.auxiliaryId.toString()}
        renderItem={({item, index}) => (
          <View
            style={{
              backgroundColor: 'lightgray',
              borderRadius: 10,
              padding: 12,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 15,
            }}>
            <View>
              <Text style={{fontSize: 18}}>{item.producto_nombre}</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 14}}>{item.length}cm</Text>
                <Text style={{fontSize: 14}}> x {item.width}cm</Text>
              </View>
            </View>
            <Text style={{fontSize: 18}}>${item.precios[0].precio_valor}</Text>
            <FontAwesome
              name={'trash'}
              size={24}
              color={quaternary}
              onPress={() => dispatch(eliminateMProduct(item.auxiliaryId))}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    margin: 10,
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: secondary,
    paddingVertical: 12,
    borderRadius: 30,
    marginBottom: 10,
    marginTop: 15,
    alignSelf: 'center',
    padding: 30,
  },
  textButton: {
    color: primary,
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MeasurementsProducts;
