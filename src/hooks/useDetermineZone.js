import {useState, useEffect} from 'react';
import geocoding from '../api/geocoding';
import {getZones} from '../api/getZones';
import {contains} from '../utils/rayCasting';

const useDetermineZone = (query) => {
  const [activeZone, setActiveZone] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!query) {
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        let zones = await getZones();
        let location = await geocoding(query);

        const filterZone = zones.filter((zone) =>
          contains(zone.zona_mapa, location.lat, location.lng),
        );

        filterZone.length ? setActiveZone(filterZone) : setActiveZone(null);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return {activeZone, isLoading};
};

export default useDetermineZone;
