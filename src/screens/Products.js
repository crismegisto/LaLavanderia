/* eslint-disable react/prop-types */
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
import {reviewedCategory, allReviewed} from '../store/actions/categoriesAction';
import styles from '../stylesheets/styleProducts';
import AddRemoveButton from '../components/AddRemoveButton';

const Products = (props) => {
  const dispatch = useDispatch();
  const products = useSelector(
    (state) =>
      state.categories.categoriesData[props.route.params.index].productos,
  );
  const categories = useSelector((state) => state.categories.categoriesData);
  const categoriesTitle = categories.map((item) => item.categoria_nombre);
  const productsInCart = useSelector((state) => state.productsInCart);
  const isAllReviewed = useSelector(
    (state) => state.categories.categoriesData,
  ).reduce((accumulator, currentValue) => {
    return accumulator && currentValue.isReviewed;
  }, true);
  const isReviewCompleted = useSelector(
    (state) => state.categories.isReviewCompleted,
  );
  useEffect(() => {
    if (isAllReviewed && !isReviewCompleted) {
      if (productsInCart.length) {
        props.navigation.navigate('PaymentProcessStack');
      }
      dispatch(allReviewed());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isAllReviewed, isReviewCompleted, props.navigation]);

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

  const nextOrBuy = () => {
    if (props.route.params.index === categories.length - 1) {
      props.navigation.navigate('Products', {
        index: 0,
        title: categoriesTitle[0],
      });
    } else {
      props.navigation.navigate('Products', {
        index: props.route.params.index + 1,
        title: categoriesTitle[props.route.params.index + 1],
      });
    }

    dispatch(reviewedCategory(props.route.params.index));
  };

  const buy = () => {
    if (productsInCart.length) {
      props.navigation.navigate('PaymentProcessStack');
    } else {
      Alert.alert('Carrito Vacío', 'Por favor agregue productos');
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 6, alignItems: 'stretch'}}>
        <FlatList
          data={localProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item, index}) => (
            <View
              style={{
                flex: 1,
                marginVertical: 10,
                marginHorizontal: 15,
                borderRadius: 20,
                height: 210,
                backgroundColor: 'white',
              }}>
              <Image
                style={{
                  marginTop: 10,
                  height: 120,
                  width: 120,
                  resizeMode: 'cover',
                  alignSelf: 'center',
                }}
                source={{
                  uri: item.producto_imagen_ruta,
                }}
              />
              <></>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    marginHorizontal: 12,
                  }}>
                  <Text style={[styles.text, {fontWeight: 'bold'}]}>
                    {item.producto_nombre}
                  </Text>
                  <Text style={styles.text}>
                    Precio c/u: {item.precios[0].precio_valor}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    height: 70,
                  }}>
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
                  {item.precios.length > 0 && (
                    <Text style={[styles.text, {fontSize: 16}]}>
                      Total: ${item.precios[0].precio_valor * item.quantity}
                    </Text>
                  )}
                </View>
              </View>
              <></>
            </View>
            /* <View style={styles.flatListContent}>
              <View style={styles.containerProductCard}>
                <Image
                  style={{width: 80, height: 80}}
                  source={{
                    uri: item.producto_imagen_ruta,
                  }}
                />
                <Text style={styles.text}>{item.producto_nombre}</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  height: 80,
                }}>
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
                {item.precios.length > 0 && (
                  <Text style={[styles.text, {fontSize: 18}]}>
                    Valor a pagar: $
                    {item.precios[0].precio_valor * item.quantity}
                  </Text>
                )}
              </View>
            </View> */
          )}
        />
      </View>
      {isReviewCompleted ? (
        <TouchableOpacity style={styles.buyButton} onPress={buy}>
          <Text style={styles.buyButtonText}>Comprar</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.buyButton} onPress={nextOrBuy}>
          <Text style={styles.buyButtonText}>Siguiente</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Products;
