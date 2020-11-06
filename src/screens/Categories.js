/* eslint-disable react/prop-types */
import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import styles from '../stylesheets/stylesCategories';
import {useSelector} from 'react-redux';

function Categories({navigation}) {
  const categories = useSelector((state) => state.categories.categoriesData);
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.categorie}
      onPress={() =>
        navigation.navigate('Products', {id: item.id, title: item.categorie})
      }>
      <ImageBackground
        source={{uri: item.logo}}
        style={styles.ImageBackground}
        imageStyle={{borderRadius: 15}}>
        <Text style={styles.text}>{item.categorie}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

export default Categories;
