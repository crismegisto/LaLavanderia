import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import AddRemoveButton from '../components/AddRemoveButton';
import {
  addUnitToProduct,
  removeUnitToProduct,
  eliminateProduct,
} from '../store/actions/productsAction';
import {sextenary} from '../theme/colors';

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
      persistentScrollbar
      data={productsInCart}
      ItemSeparatorComponent={() => (
        <View style={{height: 5, backgroundColor: sextenary}} />
      )}
      ListFooterComponent={() => (
        <View style={{height: 5, backgroundColor: sextenary}} />
      )}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) => (
        <View style={{marginVertical: 8}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 15,
            }}>
            <AddRemoveButton
              quantity={item.quantity}
              remove={() => remove(item)}
              add={() => add(item.id)}
            />
            <Text style={{fontSize: 14, fontWeight: 'bold'}}>
              {item.producto_nombre}
            </Text>
            {item.precios.length > 0 && (
              <Text style={{fontSize: 14}}>
                ${item.precios[0].precio_valor * item.quantity}
              </Text>
            )}
          </View>
        </View>
      )}
    />
  );
};

export default ProductsInShoppingCart;
