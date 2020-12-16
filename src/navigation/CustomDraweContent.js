/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Avatar, Title, Drawer} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../stylesheets/styleDrawer';
import {useDispatch} from 'react-redux';
import {signOut} from '../store/actions/authAction';
import auth from '@react-native-firebase/auth';
import {useSelector} from 'react-redux';

function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);

  const onSignOut = async () => {
    try {
      await auth().signOut();
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.drawerContent}>
        <DrawerContentScrollView {...props}>
          <View style={styles.userInfoSection}>
            <Avatar.Image
              source={{
                uri: userData.user.photo,
              }}
              size={70}
            />
            <Title style={styles.title}>{userData.user.name}</Title>
          </View>

          <View style={styles.partingLine} />

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
        </DrawerContentScrollView>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginBottom: 30,
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
          }}
          onPress={onSignOut}>
          <Text style={{fontSize: 16, marginRight: 10, color: '#02193E'}}>
            Cerrar Sesión
          </Text>
          <MaterialIcons name="logout" size={20} color="#02193E" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CustomDrawerContent;
