import React, {useCallback} from 'react';
import {TouchableHighlight, Text, Linking} from 'react-native';

const HowItWorks = () => {
  const url = 'https://www.youtube.com/watch?v=0QgPs1xZkEE';

  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      // eslint-disable-next-line no-undef
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, []);

  return (
    <TouchableHighlight onPress={handlePress}>
      <Text
        style={{
          color: '#02193E',
          fontSize: 22,
        }}>
        Cómo funciona
      </Text>
    </TouchableHighlight>
  );
};

export default HowItWorks;
