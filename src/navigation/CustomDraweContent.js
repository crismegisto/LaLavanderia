/* eslint-disable react/prop-types */
import React from 'react';
import {View} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Avatar, Title, Caption, Drawer} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../stylesheets/stylesDrawer';
import {useSelector} from 'react-redux';

Icon.loadFont();

function CustomDrawerContent(props) {
  const userData = useSelector((state) => state.userData);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <Avatar.Image
              source={{
                uri: userData.user.photo,
              }}
              size={60}
            />
            <View style={{marginLeft: 15, flexDirection: 'column'}}>
              <Title style={styles.title}>{userData.user.name}</Title>
              <View style={{flexDirection: 'row'}}>
                <Caption style={styles.caption}>1.400</Caption>
                <Icon name="ios-medal" size={15} color="darkgoldenrod" />
              </View>
            </View>
          </View>

          <View
            style={{
              borderBottomColor: '#02193E',
              borderBottomWidth: 1,
            }}
          />

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={() => <Icon name="ios-basket" size={30} color="#02193E" />}
              labelStyle={styles.titleItem}
              label="Ver Saldos"
              onPress={() => {
                props.navigation.navigate('BalanceStack');
              }}
            />
            <DrawerItem
              icon={() => <Icon name="ios-card" size={30} color="#02193E" />}
              labelStyle={styles.titleItem}
              label="Métodos de Pago"
              onPress={() => {
                props.navigation.navigate('PaymentMethodsStack');
              }}
            />
            <DrawerItem
              icon={() => <Icon name="ios-person" size={30} color="#02193E" />}
              labelStyle={styles.titleItem}
              label="Cuenta"
              onPress={() => {
                props.navigation.navigate('AccountStack');
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

export default CustomDrawerContent;
