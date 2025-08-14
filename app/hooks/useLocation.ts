import { useEffect, useState } from "react";
import * as Location from "expo-location";

interface ILocation {
  latitude: number;
  longitude: number;
}

export const useLocation = () => {
  const [location, setLocation] = useState<ILocation | null>(null);

  const getLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;

      const result = await Location.getLastKnownPositionAsync();

      setLocation({
        latitude: result?.coords.latitude as number,
        longitude: result?.coords.longitude as number,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getLocation();
  }, []);

  return location;
};
