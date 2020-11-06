import React, {useState} from 'react';
import {View} from 'react-native';
import EditButton from '../components/EditButton';
import SubmitButton from '../components/SubmitButton';
import FormFields from '../components/FormFields';

const Account = () => {
  const [editForm, setEditForm] = useState(true);

  const onPressEditButton = () => setEditForm(false);
  const onPressSubmitButton = () => setEditForm(true);

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 6}}>
        <FormFields editForm={editForm} />
      </View>
      <View style={{flex: 1}}>
        {editForm ? (
          <EditButton onPress={onPressEditButton} />
        ) : (
          <SubmitButton onPress={onPressSubmitButton} />
        )}
      </View>
    </View>
  );
};

export default Account;
