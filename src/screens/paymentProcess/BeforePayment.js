import React from 'react';
import {View, FlatList, TouchableOpacity, Text, Image} from 'react-native';
import {useSelector} from 'react-redux';
import Footer from '../../components/Footer';
import ContactUs from '../../components/ContactUs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {secondary, sextenary} from '../../theme/colors';
import styles from '../../theme/stylesCategories';

const BeforePayment = ({navigation, route}) => {
  const categories = useSelector((state) => state.categories.categoriesData);
  const renderItem = ({item, index}) => (
    <TouchableOpacity
      style={styles.containerCategory}
      onPress={() =>
        navigation.navigate('Products', {
          index,
          title: item.categoria_nombre,
        })
      }>
      <Image source={{uri: item.categoria_icono_ruta}} style={styles.image} />
      <Text style={styles.text}>{item.categoria_nombre}</Text>
      <FontAwesome name={'chevron-right'} size={24} color={secondary} />
    </TouchableOpacity>
  );
  return (
    <View style={{flex: 1}}>
      <Text style={styles.beforePaymentTitle}>¿Desea comprar algo más?</Text>
      <FlatList
        data={categories}
        persistentScrollbar
        renderItem={renderItem}
        ItemSeparatorComponent={() => (
          <View style={{height: 5, backgroundColor: sextenary}} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity
        style={styles.noThanksButton}
        onPress={() =>
          navigation.navigate('MakePayment', {
            totalToPay: route.params.totalToPay,
          })
        }>
        <Text style={styles.noThanksText}>No, Gracias</Text>
      </TouchableOpacity>
      <Footer />
      <ContactUs />
    </View>
  );
};

export default BeforePayment;
