import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {primary, secondary, tertiary, sextenary} from '../../theme/colors';
import geocoding from '../../api/geocoding';
import CheckBox from '@react-native-community/checkbox';
import AddAddress from '../modals/AddAddress';

const Step1 = (props) => {
  let addresses = [
    useSelector((state) => state.userData.user.address1),
    useSelector((state) => state.userData.user.address2),
    useSelector((state) => state.userData.user.address3),
  ].filter((item) => item);

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [newAddress, setNewAddress] = useState('');
  const [location, setLocation] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setLocation(await geocoding(newAddress));
    };

    fetchData();
  }, [newAddress]);

  useEffect(() => {
    location && newAddress
      ? props.getAddress(newAddress)
      : props.getAddress(null);
  }, [location, newAddress, props]);

  const [showModal, setShowModal] = useState(false);

  return (
    <View>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          marginTop: 20,
          marginLeft: 20,
        }}>
        Direcciones Guardadas
      </Text>
      {addresses.map((item, index) => (
        <View key={index} style={{marginVertical: 8}}>
          <TouchableOpacity
            onPress={() => setNewAddress(item)}
            style={{
              backgroundColor: secondary,
              width: '80%',
              alignSelf: 'center',
              marginTop: 10,
              borderRadius: 30,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 16, color: primary}}>{item}</Text>
          </TouchableOpacity>
        </View>
      ))}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
        }}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Portería</Text>
        <CheckBox
          disabled={false}
          value={toggleCheckBox}
          onValueChange={(newValue) => setToggleCheckBox(newValue)}
        />
      </View>
      <AddAddress
        visible={showModal}
        hideModal={() => setShowModal(false)}
        numAddresses={addresses.length}
      />
      {addresses.length < 3 && (
        <TouchableOpacity
          style={{
            backgroundColor: tertiary,
            padding: 15,
            borderRadius: 30,
            alignSelf: 'center',
            marginVertical: 10,
          }}
          onPress={() => setShowModal(true)}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: sextenary,
              alignSelf: 'center',
            }}>
            Agregar Nueva Dirección
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Step1;
