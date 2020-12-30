import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {getCollection} from '../../api/collectionAndDelivery/getCollectionApi';

const Step2 = (props) => {
  const [selectedCollectionDate, setSelectedCollectionDate] = useState({});
  const [collectionDate, setCollectionDate] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await getCollection();
        let newResults = results.map((item) => ({...item, isSelected: false}));
        setCollectionDate(newResults);
      } catch (error) {}
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (Object.keys(selectedCollectionDate).length > 0) {
      props.getCollectionDate(selectedCollectionDate);
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
                {item.horario_recogida_fecha.split('-')[1] === '12'
                  ? 'DIC.'
                  : 'ENE.'}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 20}}>
          Horario Desde: {selectedCollectionDate.horario_recogida_hora_desde}
        </Text>
        <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 20}}>
          Horario Hasta: {selectedCollectionDate.horario_recogida_hora_hasta}
        </Text>
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

export default Step2;
