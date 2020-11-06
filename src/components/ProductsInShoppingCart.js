import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import AddRemoveButton from '../components/AddRemoveButton';
import {
  addUnitToProduct,
  removeUnitToProduct,
  eliminateProduct,
} from '../store/actions/productsAction';

const ProductsInShoppingCart = () => {
  const productsInCart = useSelector((state) => state.productsInCart);
  const dispatch = useDispatch();

  const add = (id) => dispatch(addUnitToProduct(id));

  const remove = (product) => {
    product.quantity === 1
      ? dispatch(eliminateProduct(product.id))
      : dispatch(removeUnitToProduct(product.id));
  };

  return (
    <FlatList
      data={productsInCart}
      renderItem={({item}) => (
        <View
          style={{
            borderRadius: 20,
            backgroundColor: 'white',
            margin: 5,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text
              style={{
                marginTop: 15,
                color: '#02193E',
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              {item.name}
            </Text>
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 10,
                fontSize: 16,
                fontWeight: 'bold',
                marginTop: 10,
              }}>
              <Icon
                name="closecircle"
                size={25}
                color="#02193E"
                onPress={() => dispatch(eliminateProduct(item.id))}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              margin: 10,
            }}>
            <AddRemoveButton
              quantity={item.quantity}
              remove={() => remove(item)}
              add={() => add(item.id)}
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              Total: ${item.price * item.quantity}
            </Text>
          </View>
        </View>
      )}
    />
  );
};

export default ProductsInShoppingCart;
