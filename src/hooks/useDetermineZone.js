import {useState, useEffect} from 'react';
import {getZones} from '../api/getZones';
import {contains} from '../utils/rayCasting';

const useDetermineZone = (location) => {
  const [zone, setZone] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!location) {
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let zones = await getZones();

        const filterZones = zones.filter((zone) =>
          contains(zone.zona_mapa, location.lat, location.lng),
        );

        if (filterZones.length) {
          setZone(filterZones[0]);
        } else {
          throw new Error(
            'Lo sentimos, en este momento no tenemos cobertura en tu zona.',
          );
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [location]);

  return {zone, error, isLoading};
};

export default useDetermineZone;
