import React, {useState, useEffect} from 'react';
import {
  Image,
  ScrollView,
  Dimensions,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {getCoverPage} from '../api/getCoverPage';

let {width} = Dimensions.get('window');
// height = height * 0.5 - StatusBar.currentHeight;

const Carousel = () => {
  const [active, setisActive] = useState(0);

  const [images, setImages] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const coverPage = await getCoverPage();
      setImages(coverPage);
    };

    fetchData();
  }, []);

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
            source={{uri: image.portada_imagen_ruta}}
            style={{width, resizeMode: 'stretch', borderRadius: 20}}
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
