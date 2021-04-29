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
  addProduct,
  addProductUnit,
  removeProductUnit,
  deleteProduct,
} from '../store/actions/productsAction';
import styles from '../theme/styleProducts';
import AddRemoveButton from '../components/AddRemoveButton';
import {primary, sextenary} from '../theme/colors';
import MeasurementsProducts from '../components/products/MeasurementsProducts';

const Products = ({navigation, route}) => {
  const dispatch = useDispatch();

  const categories = useSelector(
    (state) => state.categories.categoriesData[route.params.index],
  );
  const products = useSelector(
    (state) => state.categories.categoriesData[route.params.index].productos,
  );
  const productsInCart = useSelector((state) => state.productsInCart);

  useEffect(() => {
    navigation.setOptions({title: route.params.title});
  }, [navigation, route.params.title]);

  const [localProducts, setLocalProducts] = useState([]); //Products that will be used temporarily and locally
  useEffect(() => {
    const newAdditional = products.map((product) => {
      const productInCart = productsInCart.find(
        (item) => item.id === product.id,
      );

      return productInCart
        ? {
            ...product,
            quantity: productInCart.quantity,
          }
        : {
            ...product,
            quantity: 0,
          };
    });

    setLocalProducts(newAdditional);
  }, [products, productsInCart]);

  const AddProduct = (product, index) => {
    let copyLocalProducts = localProducts.map((item) => ({...item}));
    copyLocalProducts[index].quantity = 1;
    setLocalProducts(copyLocalProducts);

    //Check if the product exists in the shopping cart
    if (productsInCart.some((item) => item.id === product.id)) {
      return dispatch(addProductUnit(product));
    }

    dispatch(addProduct(copyLocalProducts[index]));
  };

  const add = (index) => {
    let copyLocalProducts = localProducts.map((item) => ({...item}));
    copyLocalProducts[index].quantity++;
    setLocalProducts(copyLocalProducts);
    dispatch(addProductUnit(copyLocalProducts[index].id));
  };

  const remove = (product, index) => {
    const filterProductById = productsInCart.find(
      (item) => item.id === product.id,
    );

    let copyLocalProducts = localProducts.map((item) => ({...item}));
    copyLocalProducts[index].quantity--;
    setLocalProducts(copyLocalProducts);

    if (filterProductById.quantity === 1) {
      return dispatch(deleteProduct(filterProductById.id));
    }

    dispatch(removeProductUnit(copyLocalProducts[index].id));
  };

  const buy = () => {
    if (productsInCart.length) {
      navigation.navigate('ShoppingCart');
    } else {
      Alert.alert('Carrito Vacío', 'Por favor agregue productos');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerList}>
        {categories.categoria_descripcion && (
          <Text style={styles.description}>
            {categories.categoria_descripcion}
          </Text>
        )}
        {!products.some((product) => product.producto_medida) ? (
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
                disabled={item.quantity > 0}
                onPress={() => AddProduct(item, index)}>
                <></>
                <View style={styles.productDetails}>
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
                  {item.quantity > 0 ? (
                    !route.params.title.toLowerCase().includes('planes') ? (
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
                    )
                  ) : item.producto_descripcion ? (
                    <Text>{item.producto_descripcion}</Text>
                  ) : (
                    <></>
                  )}
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
        ) : (
          <MeasurementsProducts products={products} />
        )}
      </View>

      <TouchableOpacity style={styles.buyButton} onPress={buy}>
        <Text style={styles.buyButtonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Products;
