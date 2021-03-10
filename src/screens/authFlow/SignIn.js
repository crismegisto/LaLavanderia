import React, {useState, useEffect} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import styles from '../../theme/styleSignIn';
import GoogleSignIn from '../../components/authFlow/GoogleSignIn';
import {useSelector, useDispatch} from 'react-redux';
import DataForm from './DataForm';
import {getCustomerData} from '../../api/getCustomerData';
import {fillOutData} from '../../store/actions/authAction';
import Loader from '../../components/Loader';

const SignIn = ({navigation}) => {
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(false);
  const {uid} = useSelector((state) => state.userData.user);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsFetching(true);
        const results = await getCustomerData(uid);
        setIsFetching(false);
        dispatch(fillOutData(results));
      } catch (err) {
        console.log(err);
        setIsFetching(false);
      }
    };

    if (uid) {
      fetchData();
    }
  }, [dispatch, uid]);

  if (!uid) {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.textTitle}>LALAVANDERIA</Text>
        </View>
        <View style={styles.containerLogo}>
          <Image
            source={require('../../assets/icon-laundry.png')}
            style={styles.logo}
          />
        </View>
        <View style={styles.containerLoginMethods}>
          <GoogleSignIn />
          <View flexDirection="row">
            <View style={styles.linesLeft} />
            <Text style={styles.textBetweenLines}>O</Text>
            <View style={styles.linesRight} />
          </View>
          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.loginButtonText}>Crear Nueva Cuenta</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signinButton}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (isFetching) {
    return <Loader />;
  }

  return <DataForm />;
};

export default SignIn;
