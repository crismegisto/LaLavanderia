import {StyleSheet} from 'react-native';
import {primary} from './colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  containerList: {
    flex: 6,
    alignItems: 'stretch',
  },
  description: {
    margin: 7,
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  containerRenderItem: {
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 15,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  productDetails: {
    alignItems: 'center',
    marginVertical: 15,
    justifyContent: 'space-around',
  },
  image: {
    height: 100,
    width: 100,
    resizeMode: 'cover',
    marginVertical: 15,
    borderRadius: 10,
  },
  flatListContent: {
    flexDirection: 'row',
    marginVertical: 10,
    marginRight: 20,
    marginLeft: 10,
    alignItems: 'center',
  },
  containerProductCard: {
    width: 100,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  textTitle: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: primary,
  },
  textSubTitle: {
    fontSize: 16,
    textAlign: 'center',
    color: primary,
  },
  addRemoveContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 100,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 2,
  },
  buyButton: {
    backgroundColor: primary,
    paddingVertical: 12,
    borderRadius: 30,
    marginBottom: 15,
    marginTop: 15,
    width: '60%',
    alignSelf: 'center',
  },
  buyButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    alignSelf: 'center',
  },
  toggleButton: {
    backgroundColor: '#02193E',
    width: 90,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  toggleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
