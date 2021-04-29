import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import AddRemoveButton from '../components/AddRemoveButton';
import {
  addProductUnit,
  removeProductUnit,
  deleteProduct,
  deleteMProduct,
} from '../store/actions/productsAction';
import {sextenary} from '../theme/colors';

const ProductsInShoppingCart = () => {
  const productsInCart = useSelector((state) => state.productsInCart);
  const dispatch = useDispatch();

  const add = (id) => dispatch(addProductUnit(id));

  const remove = (product) => {
    product.quantity === 1
      ? dispatch(deleteProduct(product.id))
      : dispatch(removeProductUnit(product.id));
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
      keyExtractor={(item) => (item.id + (item.auxiliaryId || 0)).toString()}
      renderItem={({item}) => (
        <View style={{marginVertical: 8}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 15,
            }}>
            {item.producto_medida === 0 ? (
              <AddRemoveButton
                quantity={item.quantity}
                remove={() => remove(item)}
                add={() => add(item.id)}
              />
            ) : (
              <AddRemoveButton
                quantity={item.quantity}
                remove={() => dispatch(deleteMProduct(item.auxiliaryId))}
              />
            )}
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                {item.producto_nombre}
              </Text>
              {item.producto_medida !== 0 && (
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: 12}}>{item.length}cm</Text>
                  <Text style={{fontSize: 12}}> x {item.width}cm</Text>
                </View>
              )}
            </View>
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
