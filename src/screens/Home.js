import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StatusBar, Image} from 'react-native';
import Carousel from '../components/Carousel';
import PricesCarousel from '../components/PricesCarousel';
import styles from '../theme/styleHome';
import {fetchCategories} from '../store/actions/categoriesAction';
import {fillInTheData} from '../store/actions/authAction';
import {useDispatch, useSelector} from 'react-redux';
import ContactUs from '../components/ContactUs';
import Footer from '../components/Footer';
import AddAddress from '../components/address/AddAddress';
import getCustomer from '../api/getCustomer';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const {uid, addresses} = useSelector((state) => state.user);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await getCustomer(uid);
        dispatch(fillInTheData(results));
      } catch (err) {
        console.log(err);
      }
    };

    if (uid) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const transactionId = useSelector((state) => state.transaction[0]);
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch, transactionId]);

  const [showAddAddress, setShowAddAddress] = useState(false);
  useEffect(() => {
    if (!addresses.length) {
      setShowAddAddress(true);
    }
  }, [addresses]);

  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor={primary} barStyle="light-content" /> */}
      <StatusBar translucent backgroundColor="transparent" />
      <AddAddress
        visible={showAddAddress}
        hideModal={() => setShowAddAddress(false)}
      />
      <View style={styles.containerCarousel}>
        <Carousel />
      </View>
      <View style={styles.containerButtons}>
        <View style={styles.rowOfButtons}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Categories')}>
            <Image
              source={require('../assets/icons-home/icono_comprar.png')}
              style={styles.icon}
            />
            <Text style={styles.textButton}>Comprar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Schedule')}>
            <Image
              source={require('../assets/icons-home/icono_agendar.png')}
              style={styles.icon}
            />
            <Text style={styles.textButton}>Agendar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowOfButtons}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Balance')}>
            <Image
              source={require('../assets/icons-home/icono_saldo.png')}
              style={styles.icon}
            />
            <Text style={styles.textButton}>Saldos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(true)}>
            <Image
              source={require('../assets/icons-home/icono_precio.png')}
              style={styles.icon}
            />
            <Text style={styles.textButton}>Precios</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer />
      <ContactUs />
      <PricesCarousel
        hideModal={() => setModalVisible(false)}
        isVisible={modalVisible}
      />
    </View>
  );
};

export default Home;
