import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  formContainer: {
    paddingVertical: 20,
    backgroundColor: 'white',
  },
  formTitle: {
    alignSelf: 'flex-start',
    marginLeft: 30,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#02193E',
    alignItems: 'center',
    paddingVertical: 10,
    margin: 20,
    width: '40%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
