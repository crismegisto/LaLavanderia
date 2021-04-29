import React from 'react';
import {Image, Dimensions} from 'react-native';

let {width} = Dimensions.get('window');

const HeaderBackgroundImage = () => {
  return (
    <Image
      source={require('../../assets/bubbles.png')}
      style={{height: 85, width}}
    />
  );
};

export default HeaderBackgroundImage;
