import React from 'react';
import {Image, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const Header = () => {
  return (
    <Image
      source={require('../assets/header.png')}
      style={{width, height: 35, resizeMode: 'stretch'}}
    />
  );
};

export default Header;
