import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {getCollection} from '../../api/collectionAndDelivery/getCollectionApi';
import RNPickerSelect from 'react-native-picker-select';
import changeMonthFormat from '../../utils/changeMonthFormat';

const Step3 = (props) => {
  const [pickUpSchedule, setPickUpSchedule] = useState([
    {label: 'Sin horarios', value: 0},
  ]);
  const [selectedCollectionDate, setSelectedCollectionDate] = useState({});
  const [collectionDate, setCollectionDate] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await getCollection();
        let newResults = results
          .map((item) => ({...item, isSelected: false}))
          .filter(
            (item) => item.horario_recogida_zona === props.zone[0].zona_codigo,
          );
        setCollectionDate(newResults);
      } catch (error) {}
    };

    fetchData();
  }, [props.zone]);

  useEffect(() => {
    if (Object.keys(selectedCollectionDate).length > 0) {
      props.getCollectionDate(selectedCollectionDate);
      let newArr = selectedCollectionDate.horas.map((item) => ({
        label:
          'hora desde: ' +
          item.horarios_recogida_horas_hora_desde +
          '\t-\t hora hasta: ' +
          item.horarios_recogida_horas_hora_hasta,
        value: `hora desde: ${item.horarios_recogida_horas_hora_desde}	-	 hora hasta: ${item.horarios_recogida_horas_hora_hasta}`,
      }));
      setPickUpSchedule(newArr);
    }
  }, [selectedCollectionDate, props]);

  const onSelection = (selection) => {
    let newCollectionDate = collectionDate.map((item) =>
      selection.id === item.id
        ? {...item, isSelected: true}
        : {...item, isSelected: false},
    );
    setCollectionDate(newCollectionDate);
    setSelectedCollectionDate(selection);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Text
        style={{
          fontSize: 20,
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
        <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 20}}>
          Seleccionar Horario
        </Text>
        <RNPickerSelect
          placeholder={{
            label: 'Horarios',
            value: null,
            color: 'green',
          }}
          onValueChange={(value) => props.getCollectionHour(value)}
          // value={typePerson}
          items={pickUpSchedule}
          style={{
            inputAndroid: {
              color: 'black',
              height: 50,
              width: '90%',
            },
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonCard: {
    backgroundColor: '#98D7E8',
    height: 80,
    width: 60,
    marginTop: 15,
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
});

export default Step3;
