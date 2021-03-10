import React from 'react';
import {View, FlatList, TouchableOpacity, Text, Image} from 'react-native';
import {useSelector} from 'react-redux';
import Footer from '../../components/Footer';
import ContactUs from '../../components/ContactUs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {secondary, sextenary} from '../../theme/colors';

const BeforePayment = ({navigation, route}) => {
  const categories = useSelector((state) => state.categories.categoriesData);
  const renderItem = ({item, index}) => (
    <TouchableOpacity
      style={{
        padding: 10,
        height: 90,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
      onPress={() =>
        navigation.navigate('Products', {
          index,
          title: item.categoria_nombre,
        })
      }>
      <Image
        source={{uri: item.categoria_icono_ruta}}
        style={{width: 60, height: 60}}
      />
      <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>
        {item.categoria_nombre}
      </Text>
      <FontAwesome name={'chevron-right'} size={24} color={secondary} />
    </TouchableOpacity>
  );
  return (
    <View
      style={{
        flex: 1,
      }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          marginTop: 15,
          marginBottom: 5,
          marginLeft: 15,
        }}>
        ¿Desea comprar algo más?
      </Text>
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
        style={{
          backgroundColor: '#02193E',
          paddingVertical: 12,
          borderRadius: 30,
          marginBottom: 10,
          marginTop: 10,
          width: '40%',
          alignSelf: 'center',
        }}
        onPress={() =>
          navigation.navigate('MakePayment', {
            totalToPay: route.params.totalToPay,
          })
        }>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
            color: 'white',
            alignSelf: 'center',
          }}>
          No, Gracias
        </Text>
      </TouchableOpacity>
      <Footer />
      <ContactUs />
    </View>
  );
};

export default BeforePayment;
