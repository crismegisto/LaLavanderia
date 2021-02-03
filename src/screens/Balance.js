import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactUs from '../components/ContactUs';
import {sextenary} from '../theme/colors';

const Balance = () => {
  const balance = useSelector((state) => state.balance.balanceUser);

  return (
    <View style={{flex: 1}}>
      <Header />
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
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                  {item.producto.producto_nombre}
                </Text>
                <Text style={{fontSize: 18}}>
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
