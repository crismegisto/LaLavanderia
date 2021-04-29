/* eslint-disable react/prop-types */
import React, {useRef, useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Animated, Alert} from 'react-native';
import Step1 from '../components/schedulingSteps/Step1';
import Step2 from '../components/schedulingSteps/Step2';
import Step3 from '../components/schedulingSteps/Step3';
import Step4 from '../components/schedulingSteps/Step4';
import Step5 from '../components/schedulingSteps/Step5';
import styles from '../theme/styleSchedule';
import {useSelector} from 'react-redux';
import {sendSchedule} from '../api/collectionAndDelivery/sendScheduleApi';
import {primary} from '../theme/colors';
import AddAddress from '../components/address/AddAddress';

const Schedule = ({navigation}) => {
  const [showAddAddress, setShowAddAddress] = useState(false);
  const {uid, addresses} = useSelector((state) => state.user);
  useEffect(() => {
    if (!addresses.length) {
      setShowAddAddress(true);
    }
  }, [addresses]);

  const [productsToUse, setProductsToUse] = useState([]);
  const [collectionDate, setCollectionDate] = useState({});
  const [collectionHour, setCollectionHour] = useState('');
  const [deliveryDate, setDeliveryDate] = useState({});
  const [deliveryHour, setDeliveryHour] = useState('');
  const [observations, setObservations] = useState('');

  const getProductsToUse = (products) => {
    setProductsToUse(products);
  };

  const getCollectionDate = (selectedDate) => {
    setCollectionDate(selectedDate);
  };

  const getCollectionHour = (selectedHour) => {
    setCollectionHour(selectedHour);
  };

  const getDeliveryDate = (selectedDate) => {
    setDeliveryDate(selectedDate);
  };

  const getDeliveryHour = (selectedHour) => {
    setDeliveryHour(selectedHour);
  };

  const getObservations = (text) => {
    setObservations(text);
  };

  const [steps, setSteps] = useState([]);
  useEffect(() => {
    let array = [
      <Step1 getProductsToUse={getProductsToUse} />,
      // <Step1 getAddress={getAddress} />,
      <Step2
        getCollectionDate={getCollectionDate}
        getCollectionHour={getCollectionHour}
        showModal={() => setShowAddAddress(true)}
      />,
      <Step3
        getDeliveryDate={getDeliveryDate}
        collectionDate={collectionDate}
        getDeliveryHour={getDeliveryHour}
        showModal={() => setShowAddAddress(true)}
      />,
      <Step4 getObservations={getObservations} />,
      <Step5
        productsToUse={productsToUse}
        collectionDate={collectionDate}
        collectionHour={collectionHour}
        deliveryDate={deliveryDate}
        deliveryHour={deliveryHour}
        observations={observations}
      />,
    ];
    setSteps(array);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    collectionDate,
    collectionHour,
    deliveryDate,
    deliveryHour,
    observations,
  ]);

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
    inputRange: [0, 4],
    outputRange: ['20%', '100%'],
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
          setProgress(progress + 1);
        } else {
          Alert.alert(
            'No se ha seleccionado una fecha',
            'Por favor seleccione una fecha',
          );
        }
        break;
      case 3:
        setProgress(progress + 1);
        break;
      case 4:
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

  const goBack = () => {
    setProgress(progress - 1);
  };

  return (
    <View style={{flex: 1}}>
      <AddAddress
        visible={showAddAddress}
        hideModal={() => setShowAddAddress(false)}
      />
      <View style={styles.stepsContainer}>
        <View style={styles.progressBar}>
          <Animated.View style={{backgroundColor: primary, width}} />
        </View>
        <Text style={styles.stepCounter}>Paso {progress + 1} de 5</Text>
        <View style={styles.productsContainer}>{steps[progress]}</View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        {progress > 0 && (
          <TouchableOpacity onPress={goBack}>
            <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
              Atrás
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.continueButton} onPress={onContinue}>
          {productsToUse.length > 0 &&
          Object.keys(collectionDate).length > 0 &&
          progress === 5 ? (
            <Text style={styles.textContinueButton}>Aceptar</Text>
          ) : (
            <Text style={styles.textContinueButton}>Continuar</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Schedule;
