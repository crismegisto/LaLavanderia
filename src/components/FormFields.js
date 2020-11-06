/* eslint-disable react/prop-types */
import React from 'react';
import {TextInput} from 'react-native-paper';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {useSelector} from 'react-redux';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

const FormFields = (props) => {
  const userData = useSelector((state) => state.userData.user);

  const fields = [
    {label: 'Nombre', value: userData.name},
    {label: 'Celular', value: userData.cellphone},
    {label: 'Dirección', value: userData.address},
    {label: 'email', value: userData.email},
  ];

  return (
    <PaperProvider theme={theme}>
      {fields.map((item, index) => (
        <TextInput
          key={index}
          style={{margin: 20, fontSize: 20}}
          dense
          mode="outlined"
          label={item.label}
          disabled={props.editForm}
          value={item.value}
        />
      ))}
    </PaperProvider>
  );
};

export default FormFields;
