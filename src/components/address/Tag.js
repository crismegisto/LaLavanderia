import React, {useState} from 'react';
import {Text, ScrollView, TouchableOpacity} from 'react-native';
import {primary, secondary} from '../../theme/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../theme/stylesAddress/styleAddAddress';

const Tag = (props) => {
  const [labels, setLabels] = useState([
    {id: 1, name: 'Casa', icon: 'home', isSelected: false},
    {id: 2, name: 'Oficina', icon: 'briefcase', isSelected: false},
    {id: 3, name: 'Otro', icon: 'random', isSelected: false},
  ]);

  const onPress = (id, name, icon) => {
    let newLabels = labels.map((label) => {
      if (label.id === id) {
        return {...label, isSelected: true};
      } else {
        return {...label, isSelected: false};
      }
    });
    setLabels(newLabels);
    props.onSelect({id, name, icon});
  };

  return (
    <>
      <Text style={{...styles.subTitle, marginTop: 30, marginBottom: 15}}>
        Alias
      </Text>
      <ScrollView horizontal>
        {labels.map((label) => (
          <TouchableOpacity
            key={label.id}
            style={
              label.isSelected
                ? {...styles.buttonTag, backgroundColor: primary}
                : styles.buttonTag
            }
            onPress={() => onPress(label.id, label.name, label.icon)}>
            <Icon
              name={label.icon}
              size={24}
              color={label.isSelected ? secondary : primary}
            />
            <Text
              style={label.isSelected ? {color: secondary} : {color: primary}}>
              {label.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
};

export default Tag;
