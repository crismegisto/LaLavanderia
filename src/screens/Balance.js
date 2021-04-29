import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import Footer from '../components/Footer';
import ContactUs from '../components/ContactUs';
import {sextenary} from '../theme/colors';

const Balance = () => {
  const balance = useSelector((state) => state.balance.balanceUser);

  if (!balance) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Sin Saldos</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, marginTop: 20}}>
        <FlatList
          data={balance}
          persistentScrollbar
          renderItem={({item, index}) => {
            return (
              <View
                key={item.producto.id}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 10,
                  marginVertical: 10,
                  padding: 15,
                  flex: 1,
                }}>
                {item.saldo_ancho ? (
                  <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                    {item.producto.producto_nombre} {item.saldo_ancho}cm x{' '}
                    {item.saldo_largo}cm
                  </Text>
                ) : (
                  <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                    {item.producto.producto_nombre}
                  </Text>
                )}
                <Text style={{fontSize: 16}}>
                  {item.saldo_cantidad} Unidades
                </Text>
              </View>
            );
          }}
          ItemSeparatorComponent={() => (
            <View style={{height: 5, backgroundColor: sextenary}} />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <Footer />
      <ContactUs />
    </View>
  );
};

export default Balance;
