import React, {useState} from 'react';
import {
  ScrollView,
  Modal,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Alert,
  useWindowDimensions,
} from 'react-native';
import Search from './Search';
import ComplementAddress from './ComplementAddress';
import Tag from './Tag';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from '../../theme/stylesAddress/styleAddAddress';
import {primary, quaternary, secondary} from '../../theme/colors';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  addAddress,
  removeAddress,
  changeSelectedAddress,
} from '../../store/actions/addressActions';
import {useDispatch, useSelector} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const AddAddress = (props) => {
  const dispatch = useDispatch();
  const window = useWindowDimensions();

  const [address, setAddress] = useState(null);
  const [complementAddress, setComplementAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [label, setLabel] = useState({id: 3, name: 'Otro', icon: 'random'});

  const {addresses} = useSelector((state) => state.userData.user);
  const onFinishSearch = (dataAddress, location, error, loading) => {
    setIsLoading(loading);
    if (error) {
      Alert.alert(
        'Lo sentimos',
        'En este momento no tenemos cobertura en tu zona.',
      );
    } else {
      setAddress({...dataAddress, location});
    }
  };

  const confirm = () => {
    dispatch(
      addAddress({
        id: address.id,
        main_text: address.main_text,
        secondary_text: address.secondary_text,
        complementAddress,
        location: address.location,
        label,
        isSelected: true,
      }),
    );
    props.hideModal();
    setAddress(null);
  };

  return (
    <Modal animationType="slide" visible={props.visible}>
      <Spinner
        visible={isLoading}
        textContent={'Validando dirección...'}
        textStyle={{color: quaternary}}
        color={quaternary}
      />
      <View style={styles.containerModal}>
        {!address ? (
          <>
            <TouchableHighlight
              style={styles.closeButton}
              onPress={() => props.hideModal()}>
              <Icon name={'close'} size={32} color={primary} />
            </TouchableHighlight>
            <Text style={styles.title}>Añade o escoge una dirección</Text>
            <ScrollView
              keyboardShouldPersistTaps={'handled'}
              style={styles.containerModal}>
              <Search
                onFinish={onFinishSearch}
                onLoading={(value) => setIsLoading(value)}
              />
              {addresses.length > 0 ? (
                <View style={{marginVertical: 45, alignItems: 'center'}}>
                  {addresses.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      style={[
                        styles.addressView,
                        item.isSelected
                          ? {
                              width: window.width / 1.2,
                              backgroundColor: secondary,
                            }
                          : {width: window.width / 1.2},
                      ]}
                      disabled={item.isSelected}
                      onPress={() => dispatch(changeSelectedAddress(item.id))}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <FontAwesome
                          name={item.label.icon}
                          size={30}
                          color={primary}
                        />
                        <View style={{marginLeft: 15}}>
                          <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                            {item.main_text}
                          </Text>
                          <Text style={{fontSize: 16}}>
                            {item.complementAddress}
                          </Text>
                          <Text>{item.label.name}</Text>
                        </View>
                      </View>

                      {!item.isSelected && (
                        <FontAwesome
                          name={'trash'}
                          size={24}
                          color={quaternary}
                          onPress={() => dispatch(removeAddress(item.id))}
                        />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <Text style={styles.textWithoutAddres}>
                  No se ha agregado ninguna dirección
                </Text>
              )}
            </ScrollView>
          </>
        ) : (
          <ScrollView>
            <TouchableHighlight
              style={styles.closeButton}
              onPress={() => setAddress(null)}>
              <Icon name={'arrowleft'} size={32} color={primary} />
            </TouchableHighlight>
            <Text style={styles.title}>Confirmar dirección</Text>
            <Text style={styles.subTitle}>Dirección</Text>
            <Text style={styles.address}>{address.main_text}</Text>
            <ComplementAddress
              value={complementAddress}
              onChange={(details) => setComplementAddress(details)}
            />
            <Tag onSelect={(value) => setLabel(value)} />
            <TouchableOpacity style={styles.buttonConfirm} onPress={confirm}>
              <Text style={styles.buttonConfirmText}>Confirmar</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>
    </Modal>
  );
};

export default AddAddress;
