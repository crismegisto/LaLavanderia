/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {useSelector} from 'react-redux';
import ProductsInShoppingCart from '../components/ProductsInShoppingCart';

const ShoppingCart = () => {
  const productsInCart = useSelector((state) => state.productsInCart);
  const [totalToPay, setTotalToPay] = useState(0); //Products that will be used temporarily and locally
  useEffect(() => {
    if (productsInCart.length) {
      const total = productsInCart
        .map((product) => product.price * product.quantity)
        .reduce((accumulator, currentValue) => accumulator + currentValue);
      setTotalToPay(total);
    } else {
      setTotalToPay(0);
    }
  }, [productsInCart]);

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 7}}>
        <ProductsInShoppingCart />
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            backgroundColor: '#02193E',
            paddingVertical: 12,
            borderRadius: 10,
            marginBottom: 15,
            marginTop: 15,
            width: '60%',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              color: 'white',
              alignSelf: 'center',
            }}>
            Pagar ${totalToPay}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ShoppingCart;
