import polyline from "@mapbox/polyline";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, {
  LatLng,
  Marker,
  PROVIDER_GOOGLE,
  Polyline,
} from "react-native-maps";
import { getDistanceInKm } from "../helpers/getDistance";
import { useLocation } from "../hooks/useLocation";
import AppText from "./AppText";
import colors from "../config/colors";

interface IMapsProps {
  location: { latitude: number; longitude: number };
  title: string;
}

const GOOGLE_API_KEY = "AIzaSyCAFA-K94BVEPRQUIXekOMR3WwkTfryuwk";

function Maps({ location, title }: IMapsProps) {
  const userLocation = useLocation();
  const [coords, setCoords] = useState<LatLng[]>([]);

  let markerTitle = `${title} to pick up`;
  let pinColor = "red";

  const distance = getDistanceInKm(location, userLocation ?? location);

  if (distance > 2) {
    markerTitle = "You are too far to this location";
    pinColor = "gray";
  }

  useEffect(() => {
    if (!userLocation) return;

    const fetchRoute = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${userLocation.latitude},${userLocation.longitude}&destination=${location.latitude},${location.longitude}&key=${GOOGLE_API_KEY}`
        );
        const data = await response.json();

        if (data.routes && data.routes.length > 0) {
          const points = polyline.decode(
            data.routes[0].overview_polyline.points
          );
          const routeCoords = points.map((point: number[]) => ({
            latitude: point[0],
            longitude: point[1],
          }));
          setCoords(routeCoords);
        }
      } catch (err) {
        console.error("Directions API error:", err);
      }
    };

    fetchRoute();
  }, [userLocation]);

  return (
    <View style={styles.container}>
      <AppText style={styles.text}>Where you can grab the item ⬇️</AppText>
      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker coordinate={location} title={markerTitle} pinColor={pinColor} />

        {coords.length > 0 && distance > 2 && (
          <Polyline
            coordinates={coords}
            strokeWidth={4}
            strokeColors={[colors.primary]}
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    marginVertical: 10,
    padding: 20,
    borderRadius: 5,
    overflow: "hidden",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  map: {
    flex: 1,
    borderRadius: 5,
  },
});

export default Maps;
