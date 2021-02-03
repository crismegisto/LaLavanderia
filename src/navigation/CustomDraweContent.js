import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  Image,
} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Avatar, Title, Drawer} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../theme/styleDrawer';
import {primary, sextenary} from '../theme/colors';
import {useDispatch, useSelector} from 'react-redux';
import {signOut} from '../store/actions/authAction';
import auth from '@react-native-firebase/auth';

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
    <View style={styles.container}>
      <View style={styles.drawerContent}>
        <ImageBackground
          source={require('../assets/drawer_image.png')}
          style={{
            alignItems: 'center',
            height: 180,
          }}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Avatar.Image
              source={{
                uri: userData.user.photo,
              }}
              size={70}
            />
            <Title style={styles.title}>{userData.user.displayName}</Title>
          </View>
        </ImageBackground>

        <DrawerContentScrollView {...props}>
          {/* <View style={styles.dividingLine} /> */}

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={() => (
                <Image
                  source={require('../assets/icons-drawer/perfil.png')}
                  style={{width: 45, height: 45}}
                />
              )}
              labelStyle={styles.titleItem}
              label="Ver Saldos"
              onPress={() => {
                props.navigation.navigate('BalanceStack');
              }}
            />
            <DrawerItem
              icon={() => (
                <Image
                  source={require('../assets/icons-drawer/perfil.png')}
                  style={{width: 45, height: 45}}
                />
              )}
              labelStyle={styles.titleItem}
              label="Mi Perfil"
              onPress={() => {
                props.navigation.navigate('AccountStack');
              }}
            />
            <DrawerItem
              icon={() => (
                <Image
                  source={require('../assets/icons-drawer/precios.png')}
                  style={{width: 45, height: 45}}
                />
              )}
              labelStyle={styles.titleItem}
              label="Precios"
              // onPress={() => {
              //   props.navigation.navigate('AccountStack');
              // }}
            />
          </Drawer.Section>
        </DrawerContentScrollView>
      </View>

      <ImageBackground
        source={require('../assets/footer.png')}
        style={{
          flex: 1,
          resizeMode: 'cover',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginTop: 20,
            alignItems: 'center',
          }}
          onPress={onSignOut}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginRight: 10,
              color: sextenary,
            }}>
            Cerrar Sesión
          </Text>
          <MaterialIcons name="logout" size={20} color={sextenary} />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

export default CustomDrawerContent;
