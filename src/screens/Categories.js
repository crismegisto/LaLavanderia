import React from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import styles from '../theme/stylesCategories';
import {useSelector} from 'react-redux';
import ContactUs from '../components/ContactUs';
import Footer from '../components/Footer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {secondary} from '../theme/colors';

function Categories({navigation}) {
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
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyExtractor={(item) => item.id.toString()}
      />
      <Footer />
      <ContactUs />
    </View>
  );
}

export default Categories;
