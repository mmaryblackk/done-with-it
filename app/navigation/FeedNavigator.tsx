import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import ListingsScreen, { IListing } from "../screens/ListingsScreen";
import colors from "../config/colors";
import { Platform } from "react-native";
import routes from "./routes";

export type FeedStackParamList = {
  Listings: undefined;
  ListingDetails: { item: IListing };
};

const Stack = createStackNavigator<FeedStackParamList>();

const FeedNavigator: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      headerTintColor: colors.primary,
      headerStyle: { backgroundColor: colors.white },
      presentation: "modal",
    }}
  >
    <Stack.Screen name={routes.LISTINGS} component={ListingsScreen} />
    <Stack.Screen
      name={routes.LISTING_DETAILS}
      component={ListingDetailsScreen}
      options={{ headerShown: Platform.OS === "android" }}
    />
  </Stack.Navigator>
);

export default FeedNavigator;
