import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  Dimensions,
  Text,
  View,
  StyleSheet,
} from 'react-native';

let {width} = Dimensions.get('window');
// height = height * 0.5 - StatusBar.currentHeight;

const images = [
  'https://destinonegocio.com/wp-content/uploads/2015/12/ico-destinonegocio-lavanderia-istock-getty-images.jpg',
  'https://www.diariamenteali.com/medias/023-Lavanderia-siempre-ordenada.jpg?context=bWFzdGVyfGltYWdlc3wxMjA2MjV8aW1hZ2UvanBlZ3xoN2UvaGJlLzg3OTkyNTY3MDcxMDIvMDIzLS0tTGF2YW5kZXJpYS1zaWVtcHJlLW9yZGVuYWRhLmpwZ3xhMGY1YWI1ODczMGI1ZWViZTA0ODM0NzRlNDQ1NDM1NThiN2RhNTMzMTMyZTM4MDljZDYzMDVlMGUzYjRiZmQz',
  'https://assets.entrepreneur.com/content/3x2/2000/20180626143642-lavanderia.jpeg?width=700&crop=2:1',
];

const Carousel = () => {
  const [active, setisActive] = useState(0);

  const change = ({nativeEvent}) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );

    if (slide !== active) {
      setisActive(slide);
    }
  };

  return (
    <>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={change}
        scrollEventThrottle={16}>
        {images.map((image, index) => (
          <Image
            key={index}
            source={{uri: image}}
            style={{width, resizeMode: 'cover'}}
          />
        ))}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          bottom: 0,
          alignSelf: 'center',
        }}>
        {images.map((i, k) => (
          <Text style={k === active ? style.active : style.inactive} key={k}>
            ⬤
          </Text>
        ))}
      </View>
    </>
  );
};

const style = StyleSheet.create({
  active: {color: 'white', margin: 5, fontSize: 18},
  inactive: {color: '#888', margin: 5, fontSize: 18},
});

export default Carousel;
