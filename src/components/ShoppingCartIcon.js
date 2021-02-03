/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react';
import {View, Platform, TouchableOpacity, Text, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import styles from '../theme/styleShoppingCartIcon';
import {sextenary} from '../theme/colors';

//Component that shows the cart icon in the upper left of the header and is constantly updated with redux
const ShoppingCartIcon = (props) => {
  const products = useSelector((state) => state.productsInCart);
  const productsInCart = useSelector((state) => state.productsInCart);

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

  const goToPay = () => {
    if (productsInCart.length) {
      props.navigate('PaymentProcessStack');
    } else {
      Alert.alert('Carrito Vacío', 'Por favor agregue productos');
    }
  };

  return (
    <View
      style={[
        styles.container,
        Platform.OS === 'android' ? styles.iconContainer : null,
      ]}>
      <TouchableOpacity onPress={goToPay}>
        {totalQuantity > 0 && (
          <View style={styles.counter}>
            <Text style={styles.counterText}>{totalQuantity}</Text>
          </View>
        )}
        <Icon name="ios-cart" size={30} color={sextenary} />
      </TouchableOpacity>
    </View>
  );
};

export default ShoppingCartIcon;
