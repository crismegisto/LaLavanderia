import React, {useState} from 'react';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import InsertPhoneNumber from '../../components/InsertPhoneNumber';
import Verification from '../../components/Verification';
import {useDispatch} from 'react-redux';
import {addPhoneNumber} from '../../store/actions/authAction';

const PhoneAuth = () => {
  const dispatch = useDispatch();

  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  // Handle the button press
  async function verifyPhoneNumber(phoneNumber) {
    const confirmation = await auth().verifyPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  // Handle confirm code button press
  async function confirmCode(code) {
    try {
      const credential = auth.PhoneAuthProvider.credential(
        confirm.verificationId,
        code,
      );
      let {user} = await auth().currentUser.linkWithCredential(credential);
      dispatch(addPhoneNumber(user._user.phoneNumber));
    } catch (error) {
      if (error.code == 'auth/invalid-verification-code') {
        Alert.alert('Ocurrió un error', 'Código invalido.');
      } else {
        Alert.alert('Ocurrió un error', 'No fue posible vincular la cuenta.');
      }
      console.log(error);
    }
  }

  if (!confirm) {
    return <InsertPhoneNumber verifyPhoneNumber={verifyPhoneNumber} />;
  }

  return <Verification confirmCode={confirmCode} />;
};

export default PhoneAuth;
