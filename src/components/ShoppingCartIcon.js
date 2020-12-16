/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Platform, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

Icon.loadFont();

//Component that shows the cart icon in the upper left of the header and is constantly updated with redux
const ShoppingCartIcon = (props) => {
  const products = useSelector((state) => state.productsInCart);

  const [totalQuantity, setTotalQuantity] = useState(0);
  useEffect(() => {
    let total =
      products.length > 0
        ? products
            .map((item) => item.quantity)
            .reduce((accumulator, currentValue) => accumulator + currentValue)
        : 0;
    setTotalQuantity(total);
  }, [products]);

  return (
    <View
      style={[
        {padding: 5},
        Platform.OS == 'android' ? styles.iconContainer : null,
      ]}>
      <TouchableOpacity onPress={() => props.navigate('PaymentProcessStack')}>
        {totalQuantity > 0 && (
          <View
            style={{
              position: 'absolute',
              height: 25,
              width: 25,
              borderRadius: 15,
              backgroundColor: 'rgba(220,44,44,0.7)',
              right: 15,
              bottom: 15,
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2000,
            }}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 12}}>
              {totalQuantity}
            </Text>
          </View>
        )}
        <Icon name="ios-cart" size={30} color="#02193E" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    paddingLeft: 20,
    paddingTop: 10,
    marginRight: 5,
  },
});

export default ShoppingCartIcon;
