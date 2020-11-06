import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Card} from 'react-native-elements';

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

const PickUp = () => {
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
    <View style={{flex: 1}}>
      <View>
        {/* <Card>
          <Picker
            selectedValue={time}
            style={{height: 30, width: '80%'}}
            onValueChange={(itemValue) => setTime(itemValue)}>
            <Picker.Item label="10:00 a.m. - 12:00 p.m." value="1012" />
            <Picker.Item label="12:00 p.m. - 2:00 p.m." value="1214" />
            <Picker.Item label="2:00 p.m. - 4:00 p.m." value="1416" />
          </Picker>
        </Card> */}
        <Card>
          <Text style={{fontSize: 18}}>Recoger el día: {formatDate}</Text>
        </Card>
        <TouchableOpacity
          style={{
            backgroundColor: '#02193E',
            paddingVertical: 12,
            borderRadius: 10,
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
    </View>
  );
};

export default PickUp;
