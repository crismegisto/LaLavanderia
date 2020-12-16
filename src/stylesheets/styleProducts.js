import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  separator: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
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
  text: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 5,
    marginRight: 5,
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
    backgroundColor: '#02193E',
    paddingVertical: 12,
    borderRadius: 10,
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
    borderRadius: 10,
  },
  toggleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
