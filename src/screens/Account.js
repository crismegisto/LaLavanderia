import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import EditButton from '../components/EditButton';
import SubmitButton from '../components/SubmitButton';
import MyProfileForm from '../components/MyProfileForm';
import Footer from '../components/Footer';
import ContactUs from '../components/ContactUs';
import {useForm} from 'react-hook-form';
import {useSelector, useDispatch} from 'react-redux';
import {fillOutData} from '../store/actions/authAction';

const Account = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.userData.user);
  const preloadedValues = {
    document: userData.document,
    phoneNumber: userData.phoneNumber,
  };
  const {control, handleSubmit, errors} = useForm({
    defaultValues: preloadedValues,
  });

  const [isFormActive, setIsFormActive] = useState(false);

  const onPressEditButton = () => setIsFormActive(true);
  const onPressSubmitButton = () => setIsFormActive(false);

  const onSubmit = async (data) => {
    console.log(data);
    dispatch(
      fillOutData({
        document: data.document,
        phoneNumber: data.phoneNumber,
      }),
    );
    setIsFormActive(false);
  };

  return (
    <View style={{flex: 1}}>
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
