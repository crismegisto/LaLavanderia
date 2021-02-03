import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {useSelector} from 'react-redux';
import ProductsInShoppingCart from '../../components/ProductsInShoppingCart';
import styles from '../../theme/styleShoppingCart';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ContactUs from '../../components/ContactUs';

const ShoppingCart = ({navigation}) => {
  const productsInCart = useSelector((state) => state.productsInCart);
  const [totalToPay, setTotalToPay] = useState(0);
  useEffect(() => {
    if (productsInCart.length) {
      const total = productsInCart
        .map((product) =>
          product.precios.length > 0
            ? product.precios[0].precio_valor * product.quantity
            : 0,
        )
        .reduce((accumulator, currentValue) => accumulator + currentValue);
      setTotalToPay(total);
    } else {
      setTotalToPay(0);
    }
  }, [productsInCart]);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.productsContainer}>
        <ProductsInShoppingCart />
      </View>
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: {totalToPay}</Text>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('BeforePayment', {totalToPay})}>
          <Text style={styles.nextButtonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
      <Footer />
      <ContactUs />
    </View>
  );
};

export default ShoppingCart;
