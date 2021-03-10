import React from 'react';
import {TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {primary} from '../../theme/colors';
import styles from '../../theme/stylesAddress/styleClearInput';

const ClearInput = (props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.clear}>
      <FontAwesome name={'remove'} size={16} color={primary} />
    </TouchableOpacity>
  );
};

export default ClearInput;
