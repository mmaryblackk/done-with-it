import { ILocation } from "../types/interfaces";

function degreeToRadian(deg: number) {
  return deg * (Math.PI / 180);
}

export const getDistanceInKm = (
  itemLocation: ILocation,
  userLocation: ILocation
) => {
  const { latitude: itemLatitude, longitude: itemLongitude } = itemLocation;
  const { latitude: userLatitude, longitude: userLongitude } = userLocation;

  const EARTH_RADUIS_KM = 6371;

  const LATITUDE_RAD_DIFF = degreeToRadian(itemLatitude - userLatitude);
  const LONGITUDE_RAD_DIFF = degreeToRadian(itemLongitude - userLongitude);

  const TRIG_DIFF =
    Math.sin(LATITUDE_RAD_DIFF / 2) * Math.sin(LATITUDE_RAD_DIFF / 2) +
    Math.cos(degreeToRadian(itemLatitude)) *
      Math.cos(degreeToRadian(userLatitude)) *
      Math.sin(LONGITUDE_RAD_DIFF / 2) *
      Math.sin(LONGITUDE_RAD_DIFF / 2);

  const CENTRAL_RAD_CORNER =
    2 * Math.atan2(Math.sqrt(TRIG_DIFF), Math.sqrt(1 - TRIG_DIFF));

  return EARTH_RADUIS_KM * CENTRAL_RAD_CORNER;
};
