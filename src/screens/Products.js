/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  toggleProduct,
  addUnitToProduct,
  removeUnitToProduct,
  eliminateProduct,
} from '../store/actions/productsAction';
import styles from '../stylesheets/stylesProducts';
import AddRemoveButton from '../components/AddRemoveButton';

const Products = (props) => {
  const dispatch = useDispatch();
  const products = useSelector(
    (state) =>
      state.categories.categoriesData[props.route.params.id - 1].products,
  );
  const productsInCart = useSelector((state) => state.productsInCart);

  const [navigateCategories, setNavigateCategories] = useState(false);
  useEffect(() => {
    props.navigation.setOptions({title: props.route.params.title});
    let unsubscribe;
    if (!navigateCategories) {
      unsubscribe = props.navigation.addListener('blur', () => {
        setNavigateCategories(true);
      });
    } else {
      unsubscribe = props.navigation.addListener('focus', () => {
        props.navigation.navigate('Categories');
      });
    }

    return unsubscribe;
  }, [navigateCategories, props.navigation, props.route.params.title]);

  const [localProducts, setLocalProducts] = useState([]); //Products that will be used temporarily and locally
  useEffect(() => {
    const newAdditional = products.map((item) => ({...item, quantity: 0}));
    setLocalProducts(newAdditional);
  }, [products]);

  const toggleAddButton = (product, index) => {
    const filterProductById = productsInCart.filter(
      (item) => item.id === product.id,
    );

    let copyLocalProducts = localProducts.map((item) => ({...item}));
    copyLocalProducts[index].quantity = 1;
    setLocalProducts(copyLocalProducts);

    //Check if the product exists in the shopping cart
    if (filterProductById.length > 0) {
      return dispatch(addUnitToProduct(product));
    }

    dispatch(toggleProduct(copyLocalProducts[index]));
  };

  const add = (index) => {
    let copyLocalProducts = localProducts.map((item) => ({...item}));
    copyLocalProducts[index].quantity++;
    setLocalProducts(copyLocalProducts);
    dispatch(addUnitToProduct(copyLocalProducts[index].id));
  };

  const remove = (product, index) => {
    const filterProductById = productsInCart.filter(
      (item) => item.id === product.id,
    )[0];

    let copyLocalProducts = localProducts.map((item) => ({...item}));
    copyLocalProducts[index].quantity--;
    setLocalProducts(copyLocalProducts);

    if (filterProductById.quantity === 1) {
      return dispatch(eliminateProduct(filterProductById.id));
    }

    dispatch(removeUnitToProduct(copyLocalProducts[index].id));
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 6, alignItems: 'stretch'}}>
        <FlatList
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListFooterComponent={() => <View style={styles.separator} />}
          data={localProducts}
          renderItem={({item, index}) => (
            <View style={styles.flatListContent}>
              <Text style={styles.text}>{item.name}</Text>
              {item.quantity > 0 ? (
                <AddRemoveButton
                  quantity={item.quantity}
                  remove={() => remove(item, index)}
                  add={() => add(index)}
                />
              ) : (
                <TouchableOpacity
                  style={styles.toggleButton}
                  onPress={() => toggleAddButton(item, index)}>
                  <Text style={styles.toggleButtonText}>Agregar</Text>
                </TouchableOpacity>
              )}
              <Text style={styles.text}>${item.price * item.quantity}</Text>
            </View>
          )}
        />
      </View>
      <TouchableOpacity
        style={styles.buyButton}
        onPress={() => props.navigation.navigate('ShoppingCartStack')}>
        <Text style={styles.buyButtonText}>Comprar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Products;
