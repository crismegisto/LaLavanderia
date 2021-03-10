import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import {getCollectionSchedule} from '../../api/collectionAndDelivery/getCollectionSchedule';
import changeMonthFormat from '../../utils/changeMonthFormat';
import {useSelector} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {primary, secondary, quaternary, sextenary} from '../../theme/colors';
import useDetermineZone from '../../hooks/useDetermineZone';
import Spinner from 'react-native-loading-spinner-overlay';
import CheckBox from '@react-native-community/checkbox';

const Step2 = (props) => {
  const selectedAddress = useSelector((state) =>
    state.userData.user.addresses.find((address) => address.isSelected),
  );

  const [reception, setReception] = useState(false);
  const [isLoadingReception, setIsLoadingReception] = useState(true);

  const {zone, error, isLoading} = useDetermineZone(selectedAddress.location);
  useEffect(() => {
    if (error) {
      Alert.alert(
        'Lo sentimos',
        'En este momento no tenemos cobertura en tu zona.',
      );
    }
  }, [error, zone]);

  const [collectionDate, setCollectionDate] = useState([]);
  const [selectedCollectionDate, setSelectedCollectionDate] = useState({});
  const [collectionDateTime, setCollectionDateTime] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingReception(true);
      try {
        const results = await getCollectionSchedule(
          zone.zona_codigo,
          reception,
        );
        let newResults = results.map((item) =>
          item.horario_recogida_fecha ===
          selectedCollectionDate.horario_recogida_fecha
            ? {...item, isSelected: true}
            : {...item, isSelected: false},
        );
        if (newResults.some((date) => date.isSelected)) {
          onSelection(newResults.find((date) => date.isSelected));
        }

        setCollectionDate(newResults);

        setIsLoadingReception(false);
      } catch (error) {}
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reception, zone]);

  useEffect(() => {
    if (Object.keys(selectedCollectionDate).length > 0) {
      props.getCollectionDate(selectedCollectionDate);
      let newArr = selectedCollectionDate.horas.map((item) => ({
        id: item.id,
        label: `hora desde: ${item.horarios_recogida_horas_hora_desde}	-	 hora hasta: ${item.horarios_recogida_horas_hora_hasta}`,
        isSelected: false,
      }));
      newArr[0].isSelected = true;
      setCollectionDateTime(newArr);
      props.getCollectionHour(newArr[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCollectionDate]);

  const onSelection = (selection) => {
    let newCollectionDate = collectionDate.map((item) =>
      selection.id === item.id
        ? {...item, isSelected: true}
        : {...item, isSelected: false},
    );
    setCollectionDate(newCollectionDate);
    setSelectedCollectionDate(selection);
  };

  const changeSelectedDateTime = (id, label) => {
    let newDateTime = collectionDateTime.map((dateTime) =>
      dateTime.id === id
        ? {...dateTime, isSelected: true}
        : {...dateTime, isSelected: false},
    );
    setCollectionDateTime(newDateTime);
    props.getCollectionHour(label);
  };

  return (
    <ScrollView persistentScrollbar>
      <Spinner
        visible={isLoading || isLoadingReception}
        textContent={'Cargando...'}
        textStyle={{color: quaternary}}
        color={quaternary}
      />
      <Text
        style={{
          marginTop: 10,
          marginLeft: 10,
          fontSize: 18,
          fontWeight: 'bold',
        }}>
        Dirección donde recogemos
      </Text>
      <View style={styles.addressView}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <FontAwesome
            name={selectedAddress.label.icon}
            size={30}
            color={primary}
          />
          <View style={{marginLeft: 15}}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              {selectedAddress.main_text}
            </Text>
            <Text style={{fontSize: 16}}>
              {selectedAddress.complementAddress}
            </Text>
            <Text>{selectedAddress.label.name}</Text>
          </View>
        </View>
      </View>
      <Text
        style={{
          textDecorationLine: 'underline',
          fontWeight: 'bold',
          color: primary,
          textShadowColor: secondary,
          textShadowRadius: 10,
          alignSelf: 'center',
          fontSize: 16,
          marginBottom: 15,
        }}
        onPress={() => props.showModal()}>
        Cambiar o agregar dirección
      </Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 16, fontWeight: 'bold', marginRight: 7}}>
          Portería
        </Text>
        <CheckBox
          disabled={false}
          value={reception}
          onValueChange={(newValue) => setReception(newValue)}
        />
      </View>

      <Text
        style={{
          fontSize: 18,
          alignSelf: 'center',
          color: 'black',
          marginVertical: 10,
          fontWeight: 'bold',
        }}>
        Fecha y Hora de Recogida
      </Text>
      <View style={{alignItems: 'center'}}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          scrollEventThrottle={16}>
          {collectionDate.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => onSelection(item)}
              style={
                item.isSelected
                  ? {...styles.buttonCard, backgroundColor: '#02193E'}
                  : styles.buttonCard
              }>
              <Text
                style={
                  item.isSelected
                    ? {...styles.buttonCardText, color: '#98D7E8'}
                    : styles.buttonCardText
                }>
                {item.horario_recogida_fecha.split('-')[2]}
              </Text>
              <Text
                style={
                  item.isSelected
                    ? {...styles.buttonCardDateText, color: '#98D7E8'}
                    : styles.buttonCardDateText
                }>
                {changeMonthFormat(item.horario_recogida_fecha)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 15}}>
          Seleccionar Horario
        </Text>
        {collectionDateTime.map((date) => (
          <TouchableOpacity
            key={date.id}
            style={{
              marginVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '80%',
            }}
            onPress={() => changeSelectedDateTime(date.id, date)}>
            <Text>{date.label}</Text>
            {date.isSelected && (
              <View style={{marginRight: 5}}>
                <FontAwesome
                  name={'check-square-o'}
                  size={30}
                  color={'green'}
                />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonCard: {
    backgroundColor: '#98D7E8',
    height: 80,
    width: 60,
    marginTop: 5,
    marginHorizontal: 7,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCardText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#02193E',
  },
  buttonCardDateText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#02193E',
    marginTop: 5,
  },
  addressView: {
    backgroundColor: sextenary,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '85%',
    alignSelf: 'center',
    marginTop: 5,
  },
});

export default Step2;
