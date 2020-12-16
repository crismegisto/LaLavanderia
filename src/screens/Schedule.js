/* eslint-disable react/prop-types */
import React, {useRef, useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Animated} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Step1 from '../components/schedulingSteps/Step1';
import Step2 from '../components/schedulingSteps/Step2';
import styles from '../stylesheets/styleSchedule';

const Schedule = ({navigation}) => {
  const [steps, setSteps] = useState([]);
  useEffect(() => {
    let array = [<Step1 />, <Step2 />];
    setSteps(array);
  }, []);

  let animation = useRef(new Animated.Value(0)).current;
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    Animated.timing(animation, {
      toValue: progress,
      duration: 5,
      useNativeDriver: false,
    }).start();
  }, [animation, progress]);

  const width = animation.interpolate({
    inputRange: [0, 4],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.mainContainer}>
      <View style={styles.stepsContainer}>
        <MaterialIcons name="schedule" size={60} style={styles.scheduleIcon} />
        <View style={styles.progressBar}>
          <Animated.View style={{backgroundColor: '#02193E', width}} />
        </View>
        <Text style={styles.stepCounter}>Paso {progress + 1} de 5</Text>
        {steps[progress]}
      </View>
      <TouchableOpacity
        style={styles.continueButton}
        // onPress={() => navigation.navigate('PickUp')}
        onPress={() => setProgress(progress + 1)}>
        <Text style={styles.textContinueButton}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Schedule;
