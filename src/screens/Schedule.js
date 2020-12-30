/* eslint-disable react/prop-types */
import React, {useRef, useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Animated, Alert} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Step1 from '../components/schedulingSteps/Step1';
import Step2 from '../components/schedulingSteps/Step2';
import Step3 from '../components/schedulingSteps/Step3';
import styles from '../stylesheets/styleSchedule';
import {useSelector} from 'react-redux';
import {sendSchedule} from '../api/collectionAndDelivery/sendScheduleApi';

const Schedule = ({navigation}) => {
  const uid = useSelector((state) => state.userData.user.uid);

  const [productsToUse, setProductsToUse] = useState([]);
  const [collectionDate, setCollectionDate] = useState({});
  const [deliveryDate, setDeliveryDate] = useState({});

  const getProductsToUse = (products) => {
    setProductsToUse(products);
  };

  const getCollectionDate = (selectedDate) => {
    setCollectionDate(selectedDate);
  };

  const getDeliveryDate = (selectedDate) => {
    setDeliveryDate(selectedDate);
  };

  const [steps, setSteps] = useState([]);
  useEffect(() => {
    let array = [
      <Step1 getProductsToUse={getProductsToUse} />,
      <Step2 getCollectionDate={getCollectionDate} />,
      <Step3 getDeliveryDate={getDeliveryDate} />,
    ];
    setSteps(array);
  }, []);

  let animation = useRef(new Animated.Value(0)).current;
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    Animated.timing(animation, {
      toValue: progress,
      duration: 5,
      useNativeDriver: false,
    }).start();
  }, [animation, progress]);

  const width = animation.interpolate({
    inputRange: [0, 2],
    outputRange: ['25%', '100%'],
    extrapolate: 'clamp',
  });

  const onContinue = () => {
    switch (progress) {
      case 0:
        if (productsToUse.length > 0) {
          setProgress(progress + 1);
        } else {
          Alert.alert(
            'Sin productos para agendar',
            'Por favor agregue productos con el botón +',
          );
        }
        break;
      case 1:
        if (Object.keys(collectionDate).length > 0) {
          setProgress(progress + 1);
        } else {
          Alert.alert(
            'No se ha seleccionado una fecha',
            'Por favor seleccione una fecha',
          );
        }
        break;
      case 2:
        if (Object.keys(deliveryDate).length > 0) {
          const products = productsToUse.map((product) => ({
            id: product.producto.id,
            cantidad: product.currentValue,
          }));
          const productsToSend = {productos: products};
          sendSchedule(uid, productsToSend, deliveryDate, collectionDate);
          navigation.navigate('Home');
          Alert.alert('Agendamiento exitoso');
        } else {
          Alert.alert(
            'No se ha seleccionado una fecha',
            'Por favor seleccione una fecha',
          );
        }
        break;
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.stepsContainer}>
        <MaterialIcons name="schedule" size={60} style={styles.scheduleIcon} />
        <View style={styles.progressBar}>
          <Animated.View style={{backgroundColor: '#02193E', width}} />
        </View>
        <Text style={styles.stepCounter}>Paso {progress + 1} de 3</Text>
      </View>
      <View style={styles.productsContainer}>{steps[progress]}</View>
      <TouchableOpacity style={styles.continueButton} onPress={onContinue}>
        {productsToUse.length > 0 &&
        Object.keys(collectionDate).length > 0 &&
        progress === 2 ? (
          <Text style={styles.textContinueButton}>Finalizar</Text>
        ) : (
          <Text style={styles.textContinueButton}>Continuar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Schedule;
