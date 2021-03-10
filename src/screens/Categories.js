import React from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import styles from '../theme/stylesCategories';
import {useSelector} from 'react-redux';
import ContactUs from '../components/ContactUs';
import Footer from '../components/Footer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {secondary, sextenary} from '../theme/colors';

function Categories({navigation}) {
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
    <View style={{flex: 1, justifyContent: 'space-between'}}>
      <FlatList
        data={categories}
        renderItem={renderItem}
        ItemSeparatorComponent={() => (
          <View style={{height: 5, backgroundColor: sextenary}} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Footer />
      <ContactUs />
    </View>
  );
}

export default Categories;
