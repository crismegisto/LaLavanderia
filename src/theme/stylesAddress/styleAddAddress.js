import {StyleSheet, Dimensions} from 'react-native';
import {primary, secondary, sextenary} from '../colors';

let {width} = Dimensions.get('window');
let newWidth = width / 3.5;

export default StyleSheet.create({
  containerModal: {
    flex: 1,
    backgroundColor: 'white',
  },
  closeButton: {
    margin: 10,
    height: 37,
    width: 37,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginLeft: 10,
    fontSize: 28,
    fontWeight: 'bold',
  },
  subTitle: {
    marginTop: 40,
    marginLeft: 15,
    fontSize: 20,
    fontWeight: 'bold',
  },
  address: {
    marginTop: 10,
    marginLeft: 15,
    fontSize: 18,
  },
  textWithoutAddres: {
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 45,
  },
  input: {
    fontSize: 14,
    textAlign: 'right',
    backgroundColor: sextenary,
    width: '90%',
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
  },
  buttonTag: {
    backgroundColor: secondary,
    width: newWidth,
    height: 75,
    borderRadius: 20,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonConfirm: {
    backgroundColor: primary,
    paddingVertical: 12,
    borderRadius: 30,
    marginBottom: 15,
    marginTop: 40,
    width: '60%',
    alignSelf: 'center',
  },
  buttonConfirmText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    alignSelf: 'center',
  },
  addressView: {
    backgroundColor: sextenary,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
});
