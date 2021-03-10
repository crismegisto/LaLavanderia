import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, Alert, Linking} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import TermsAndConditions from '../../components/TermsAndConditions';
import CheckBox from '@react-native-community/checkbox';
import styles from '../../theme/styleMakePayment';
import {
  getAcceptanceToken,
  createTransaction,
  checkTransaction,
} from '../../api/wompi/transactionApi';
import {generateBill} from '../../api/generateBill';
import Spinner from 'react-native-loading-spinner-overlay';
import NequiData from '../../components/wompiData/NequiData';
import PSEData from '../../components/wompiData/PSEData';
import CreditCardData from '../../components/wompiData/CreditCardData';
import {
  saveTransaction,
  deleteTransaction,
} from '../../store/actions/transactionAction';
import {removeAllProducts} from '../../store/actions/productsAction';
import SuccessModal from '../../components/modals/SuccessModal';
import DeclinedModal from '../../components/modals/declinedModal';
import PaymentMethod from '../../components/PaymentMethod';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Footer from '../../components/Footer';
import ContactUs from '../../components/ContactUs';
import {quaternary} from '../../theme/colors';

const MakePayment = ({navigation, route}) => {
  const dispatch = useDispatch();

  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [declinedModalVisible, setDeclinedModalVisible] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [
    areTermsAndConditionsAccepted,
    setAreTermsAndConditionsAccepted,
  ] = useState(false);

  const productsInCart = useSelector((state) => state.productsInCart);
  const newProductsInCart = useSelector((state) =>
    state.productsInCart.map((item) => ({
      id: item.id,
      cantidad: item.quantity,
    })),
  );
  let productToBill = {productos: newProductsInCart};
  const userUid = useSelector((state) => state.userData.user.uid);

  const transactionId = useSelector((state) => state.transaction[0]);
  useEffect(() => {
    const fetchData = async () => {
      const {status, payment_method} = await checkTransaction(transactionId);
      switch (status) {
        case 'PENDING':
          if (payment_method.extra) {
            if (payment_method.extra.async_payment_url) {
              try {
                await Linking.openURL(payment_method.extra.async_payment_url);
              } catch (err) {}
            }
          }
          await new Promise((resolve) => setTimeout(resolve, 500));
          await fetchData();
          break;
        case 'APPROVED':
          dispatch(deleteTransaction());
          generateBill(userUid, productToBill);
          setSuccessModalVisible(!successModalVisible);
          dispatch(removeAllProducts());
          break;
        case 'DECLINED':
          dispatch(deleteTransaction());
          setDeclinedModalVisible(!declinedModalVisible);
          break;
        default:
          dispatch(deleteTransaction());
      }
    };
    if (transactionId) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [declinedModalVisible, dispatch, successModalVisible, transactionId]);

  const payment = useSelector((state) =>
    state.userData.paymentMethods.filter((item) => item.active),
  );
  const [showSpinnerValidator, setShowSpinnerValidator] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const acceptanceToken = await getAcceptanceToken();

        // const id = await tokenCard();
        const {data} = await createTransaction(
          acceptanceToken,
          payment[0].wompiData,
        );
        setShowSpinnerValidator(!showSpinnerValidator);
        dispatch(saveTransaction(data.id));
      } catch (error) {
        setShowSpinnerValidator(!showSpinnerValidator);
        Alert.alert('Ocurrió un error', error.message);
      }
    };

    if (showSpinnerValidator) {
      fetchData();
    }
  }, [dispatch, payment, showSpinnerValidator]);

  return (
    <View style={styles.container}>
      <PaymentMethod payment={payment} />
      <>
        <Spinner
          visible={showSpinnerValidator}
          textContent={'Validando datos...'}
          textStyle={{color: quaternary}}
          color={quaternary}
        />
        <Spinner
          visible={Boolean(transactionId)}
          textContent={'Verificando Transacción...'}
          textStyle={{color: quaternary}}
          color={quaternary}
        />
      </>
      <KeyboardAwareScrollView
        persistentScrollbar
        contentContainerStyle={styles.containerScrollView}>
        {payment[0].id === 1 ? (
          <NequiData
            validateForm={(value) => setIsFormValid(value)}
            payment={payment}
          />
        ) : payment[0].id === 2 ? (
          <PSEData
            validateForm={(value) => setIsFormValid(value)}
            payment={payment}
          />
        ) : (
          <CreditCardData
            validateForm={(value) => setIsFormValid(value)}
            payment={payment}
          />
        )}

        <View style={{flex: 1, justifyContent: 'center'}}>
          {productsInCart.map((product) => (
            <View
              key={product.id}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 25,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 14}}>{product.producto_nombre}</Text>
                <Text style={{fontSize: 14}}>x{product.quantity}</Text>
              </View>

              <Text style={{fontSize: 14}}>
                ${product.precios[0].precio_valor * product.quantity}
              </Text>
            </View>
          ))}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 25,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>Total</Text>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>
              ${route.params.totalToPay}
            </Text>
          </View>
        </View>

        <View style={styles.payment}>
          <View style={styles.termsAndConditions}>
            <CheckBox
              disabled={false}
              value={areTermsAndConditionsAccepted}
              onValueChange={(newValue) =>
                setAreTermsAndConditionsAccepted(newValue)
              }
            />
            <Text>
              <Text>Acepto haber leído </Text>
              <TermsAndConditions navigation={navigation} />
              <Text> para hacer esta compra.</Text>
            </Text>
          </View>
          <TouchableOpacity
            style={
              areTermsAndConditionsAccepted && isFormValid
                ? styles.paymentButton
                : {...styles.paymentButton, backgroundColor: 'gray'}
            }
            onPress={() => setShowSpinnerValidator(!showSpinnerValidator)}
            disabled={!areTermsAndConditionsAccepted && !isFormValid}>
            <Text style={styles.paymentButtonText}>Pagar</Text>
          </TouchableOpacity>
        </View>
        <>
          <SuccessModal
            openModal={successModalVisible}
            modalVisible={() => setSuccessModalVisible(!successModalVisible)}
            navigation={navigation}
          />
          <DeclinedModal
            openModal={declinedModalVisible}
            modalVisible={() => setDeclinedModalVisible(!declinedModalVisible)}
            navigation={navigation}
          />
        </>
        <Footer />
        <ContactUs />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default MakePayment;
