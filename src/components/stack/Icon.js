import React from 'react';
import {Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {sextenary} from '../../theme/colors';

const HeaderBackgroundImage = ({navigation, screen}) => {
  return (
    <Icon
      name="ios-arrow-back"
      size={35}
      color={sextenary}
      style={[Platform.OS == 'ios' ? {bottom: 4} : null, {padding: 10}]}
      onPress={() => navigation.navigate(screen)}
    />
  );
};

export default HeaderBackgroundImage;
