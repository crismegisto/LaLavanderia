/* eslint-disable react/prop-types */
import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, StatusBar} from 'react-native';
import Carousel from '../components/Carousel';
import styles from '../stylesheets/styleHome';
import {fetchCategories} from '../store/actions/categoriesAction';
import {fetchBalance} from '../store/actions/balanceAction';
import {useDispatch} from 'react-redux';
import ContactUs from '../components/ContactUs';

const Home = ({navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBalance());
  }, [dispatch]);

  return (
    <View style={{flex: 1, alignItems: 'stretch'}}>
      <StatusBar backgroundColor="#98D7E8" barStyle="dark-content" />
      <View style={{flex: 4}}>
        <Carousel />
      </View>
      <TouchableOpacity
        style={styles.bottom}
        onPress={() => navigation.navigate('Categories')}>
        <Text
          style={{
            color: '#02193E',
            fontSize: 22,
          }}>
          Planes y Servicios
        </Text>
      </TouchableOpacity>
      <View style={styles.separator} />
      <TouchableOpacity
        style={styles.bottom}
        onPress={() => navigation.navigate('Schedule')}>
        <Text
          style={{
            color: '#02193E',
            fontSize: 22,
          }}>
          Agendar
        </Text>
      </TouchableOpacity>
      <View style={styles.separator} />
      <ContactUs />
    </View>
  );
};

export default Home;
