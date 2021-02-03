import React, {useState, useEffect} from 'react';
import {View, ScrollView, Alert} from 'react-native';
import EditButton from '../components/EditButton';
import SubmitButton from '../components/SubmitButton';
import MyProfileForm from '../components/MyProfileForm';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactUs from '../components/ContactUs';
import {useForm} from 'react-hook-form';
import {useSelector, useDispatch} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {quaternary} from '../theme/colors';
import useDetermineZone from '../hooks/useDetermineZone';
import {fillOutData} from '../store/actions/authAction';

const Account = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.userData.user);
  const preloadedValues = {
    document: userData.document,
    phoneNumber: userData.phoneNumber,
    address1: userData.address1,
    complementAddress1: userData.complementAddress1,
    address2: userData.address2,
    complementAddress2: userData.complementAddress2,
    address3: userData.address3,
    complementAddress3: userData.complementAddress3,
  };
  const {control, handleSubmit, errors} = useForm({
    defaultValues: preloadedValues,
  });

  const [isFormActive, setIsFormActive] = useState(false);
  const [address1, setAddress1] = useState('');
  const zone1 = useDetermineZone(address1);
  const [address2, setAddress2] = useState('');
  const zone2 = useDetermineZone(address2);
  const [address3, setAddress3] = useState('');
  const zone3 = useDetermineZone(address3);
  const [validatedFormData, setValidatedFormData] = useState({});

  const onPressEditButton = () => setIsFormActive(true);
  const onPressSubmitButton = () => setIsFormActive(false);

  // useEffect(() => {
  //   if (Object.keys(validatedFormData).length > 0) {
  //     if (
  //       zone1.activeZone &&
  //       zone2.activeZone &&
  //       zone3.activeZone &&
  //       !zone1.isLoading &&
  //       !zone2.isLoading &&
  //       !zone3.isLoading
  //     ) {
  //       // dispatch(
  //       //   fillOutData({
  //       //     displayName,
  //       //     firstName: validatedFormData.firstName,
  //       //     lastName: validatedFormData.lastName,
  //       //     phoneNumber: validatedFormData.phoneNumber,
  //       //     address1: address,
  //       //     document: validatedFormData.document,
  //       //   }),
  //       // );
  //       console.log(validatedFormData, 'woow');
  //       console.log(zone1, zone2, zone3, 'wow');
  //     } else {
  //       console.log(validatedFormData);
  //       console.log(zone1, zone2, zone3);
  //       // Alert.alert(
  //       //   'Lo sentimos',
  //       //   'En este momento no tenemos cobertura en tu zona.',
  //       // );
  //     }
  //   }
  // }, [dispatch, validatedFormData, zone1, zone2, zone3]);

  const onSubmit = async (data) => {
    console.log(data);
    dispatch(
      fillOutData({
        document: data.document,
        phoneNumber: data.phoneNumber,
        address1: data.address1,
        complementAddress1: data.complementAddress1,
        address2: data.address2,
        complementAddress2: data.complementAddress2,
        address3: data.address3,
        complementAddress3: data.complementAddress3,
      }),
    );
    setIsFormActive(false);
  };

  return (
    <View style={{flex: 1}}>
      <Header />
      <Spinner
        visible={zone1.isLoading || zone2.isLoading || zone3.isLoading}
        textContent={'Validando datos...'}
        textStyle={{color: quaternary}}
        color={quaternary}
      />
      <ScrollView
        persistentScrollbar
        contentContainerStyle={{paddingVertical: 20}}>
        <MyProfileForm
          isFormActive={isFormActive}
          onPressSubmitButton={onPressSubmitButton}
          control={control}
          errors={errors}
        />
      </ScrollView>
      <Footer />
      {isFormActive ? (
        <SubmitButton onPress={handleSubmit(onSubmit)} />
      ) : (
        <EditButton onPress={onPressEditButton} />
      )}
      <ContactUs />
    </View>
  );
};

export default Account;
