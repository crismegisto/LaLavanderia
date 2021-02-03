import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  toggleProduct,
  addUnitToProduct,
  removeUnitToProduct,
  eliminateProduct,
} from '../store/actions/productsAction';
import styles from '../theme/styleProducts';
import AddRemoveButton from '../components/AddRemoveButton';
import Header from '../components/Header';
import {primary, sextenary} from '../theme/colors';

const Products = (props) => {
  const dispatch = useDispatch();
  const products = useSelector(
    (state) =>
      state.categories.categoriesData[props.route.params.index].productos,
  );
  const productsInCart = useSelector((state) => state.productsInCart);

  // const [navigateCategories, setNavigateCategories] = useState(false);
  useEffect(() => {
    props.navigation.setOptions({title: props.route.params.title});
  }, [props.navigation, props.route.params.title]);

  const [localProducts, setLocalProducts] = useState([]); //Products that will be used temporarily and locally
  useEffect(() => {
    const newAdditional = products.map((item) => ({
      ...item,
      quantity: 0,
    }));
    setLocalProducts(newAdditional);
  }, [products]);

  // const toggleProduct = (product) => {
  //   const newLocalProducts = localProducts.map((item) =>
  //     item.id === product.id ? {...item, isSelected: !item.isSelected} : item,
  //   );
  //   setLocalProducts(newLocalProducts);
  // };

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

  const buy = () => {
    if (productsInCart.length) {
      props.navigation.navigate('PaymentProcessStack');
    } else {
      Alert.alert('Carrito Vacío', 'Por favor agregue productos');
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.containerList}>
        <FlatList
          persistentScrollbar
          data={localProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={
                item.quantity > 0
                  ? {...styles.containerRenderItem, backgroundColor: primary}
                  : styles.containerRenderItem
              }
              onPress={() => toggleAddButton(item, index)}>
              <></>
              <View
                style={{
                  alignItems: 'center',
                  marginVertical: 15,
                  justifyContent: 'space-around',
                }}>
                <Text
                  style={
                    item.quantity > 0
                      ? [styles.textTitle, {color: sextenary}]
                      : styles.textTitle
                  }>
                  {item.producto_nombre}
                </Text>
                <Text
                  style={
                    item.quantity > 0
                      ? [styles.textSubTitle, {color: sextenary}]
                      : styles.textSubTitle
                  }>
                  Precio: ${item.precios[0].precio_valor}
                </Text>
                {item.quantity > 0 &&
                  (!props.route.params.title
                    .toLowerCase()
                    .includes('planes') ? (
                    <AddRemoveButton
                      quantity={item.quantity}
                      remove={() => remove(item, index)}
                      add={() => add(index)}
                      textColor={sextenary}
                    />
                  ) : (
                    <AddRemoveButton
                      quantity={item.quantity}
                      remove={() => remove(item, index)}
                      textColor={sextenary}
                    />
                  ))}
              </View>
              <></>
              <Image
                style={styles.image}
                source={{
                  uri: item.producto_imagen_ruta,
                }}
              />
            </TouchableOpacity>
          )}
        />
      </View>

      <TouchableOpacity style={styles.buyButton} onPress={buy}>
        <Text style={styles.buyButtonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Products;
