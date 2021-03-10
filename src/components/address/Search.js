import React, {useState, useEffect, useRef} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {apiKeyGoogle} from '../../keys';
import ClearInput from './ClearInput';
import styles from '../../theme/stylesAddress/styleSearch';
import useDetermineZone from '../../hooks/useDetermineZone';

const GooglePlacesInput = (props) => {
  const ref = useRef();
  const [address, setAddress] = useState(null);
  const [location, setLocation] = useState(null);
  const {zone, error, isLoading} = useDetermineZone(location);
  useEffect(() => {
    if ((zone || error) && !isLoading) {
      props.onFinish(address, location, error, isLoading);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isLoading, zone]);

  return (
    <GooglePlacesAutocomplete
      ref={ref}
      fetchDetails
      placeholder="¿Dónde recogemos/entregamos?"
      styles={styles}
      onPress={(data, details = null) => {
        setAddress({...data.structured_formatting, id: data.place_id});
        setLocation(details.geometry.location);
        props.onLoading(true);
      }}
      query={{
        key: apiKeyGoogle,
        language: 'es',
        components: 'country:co',
      }}
      renderRightButton={() => <ClearInput clear={() => ref.current.clear()} />}
    />
  );
};

export default GooglePlacesInput;
