import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
// import {Picker} from '@react-native-picker/picker';

const months = [
  'EN',
  'FEB',
  'MAR',
  'ABR',
  'MAY',
  'JUN',
  'JUL',
  'AGTO',
  'SEPT',
  'OCT',
  'NOV',
  'DIC',
];

const Step2 = () => {
  const [date, setDate] = useState(new Date());
  const [minimumDate, setMinimumDate] = useState(new Date());
  const [formatDate, setFormatDate] = useState('');
  const [time, setTime] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    const today = new Date();
    const newDate = new Date();
    newDate.setDate(today.getDate() + 2);
    setMinimumDate(newDate);
  }, []);

  const onChange = (event, selectedDate) => {
    const pickUpDate = selectedDate || date;
    setShow(Platform.OS === 'ios');

    let formatted_date =
      pickUpDate.getDate() +
      '-' +
      months[pickUpDate.getMonth()] +
      '-' +
      pickUpDate.getFullYear();

    setFormatDate(formatted_date);
    setDate(pickUpDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View>
      <View>
        <Text style={{fontSize: 18, marginLeft: 10}}>
          Recoger el día: {formatDate}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#02193E',
            paddingVertical: 12,
            borderRadius: 30,
            marginBottom: 15,
            marginTop: 15,
            width: '60%',
            alignSelf: 'center',
          }}
          onPress={showDatepicker}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              color: 'white',
              alignSelf: 'center',
            }}>
            Seleccionar Día
          </Text>
        </TouchableOpacity>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onChange}
          minimumDate={minimumDate}
        />
      )}
      {/* <Picker
        selectedValue={time}
        style={{height: 30, width: '70%', marginBottom: 20}}
        onValueChange={(itemValue) => setTime(itemValue)}>
        <Picker.Item value="" label="Hora de recogida" />
        <Picker.Item label="10:00 a.m. - 12:00 p.m." value="1012" />
        <Picker.Item label="12:00 p.m. - 2:00 p.m." value="1214" />
        <Picker.Item label="2:00 p.m. - 4:00 p.m." value="1416" />
      </Picker> */}
    </View>
  );
};

export default Step2;
