/* eslint-disable react/prop-types */
import React, {useState} from 'react';
import {View, Button} from 'react-native';
import {CreditCardInput} from 'react-native-input-credit-card';
import {useDispatch} from 'react-redux';
import {addCard} from '../store/actions/authAction';

const AddCard = ({navigation}) => {
  const [validCard, setValidCard] = useState(false);
  const [dataToSave, setDataToSave] = useState({});
  const dispatch = useDispatch();

  const onChange = (data) => {
    if (data.valid) {
      setValidCard(true);
      setDataToSave(data.values);
    } else {
      setValidCard(false);
    }
  };

  const onPressSave = () => {
    dispatch(addCard({...dataToSave, id: Math.random(), active: false}));
    navigation.goBack();
  };

  return (
    <View style={{flex: 1, marginTop: 10}}>
      <CreditCardInput requiresName onChange={onChange} />
      <View style={{flex: 1, alignItems: 'center'}}>
        <Button
          title="Guardar Tarjeta"
          disabled={!validCard}
          onPress={onPressSave}
        />
      </View>
    </View>
  );
};

export default AddCard;
