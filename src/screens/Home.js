/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StatusBar, Image} from 'react-native';
import Carousel from '../components/Carousel';
import PricesCarousel from '../components/PricesCarousel';
import styles from '../theme/styleHome';
import {fetchCategories} from '../store/actions/categoriesAction';
import {fetchBalance} from '../store/actions/balanceAction';
import {useDispatch, useSelector} from 'react-redux';
import ContactUs from '../components/ContactUs';
import {primary} from '../theme/colors';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const uid = useSelector((state) => state.userData.user.uid);
  const transactionId = useSelector((state) => state.transaction[0]);
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBalance(uid));
  }, [dispatch, uid, transactionId]);

  return (
    <View style={{flex: 1, alignItems: 'stretch'}}>
      <StatusBar backgroundColor={primary} barStyle="light-content" />
      <Header />
      <View style={{flex: 3}}>
        <Carousel />
      </View>
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            style={styles.bottom}
            onPress={() => navigation.navigate('Categories')}>
            <Text style={styles.textBottom}>Comprar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottom}
            onPress={() => navigation.navigate('Schedule')}>
            <Image
              source={require('../assets/icons-home/agenda_servicio.png')}
              style={{width: 35, height: 35, marginRight: 7}}
            />
            <Text style={styles.textBottom}>Agendar</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            style={styles.bottom}
            onPress={() => navigation.navigate('BalanceStack')}>
            <Text style={styles.textBottom}>Ver Saldos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottom}
            onPress={() => setModalVisible(true)}>
            <Image
              source={require('../assets/icons-home/precios.png')}
              style={{width: 35, height: 35, marginRight: 7}}
            />
            <Text style={styles.textBottom}>Precios</Text>
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
