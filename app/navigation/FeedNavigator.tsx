import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Platform } from "react-native";

import colors from "../config/colors";
import { FeedStackParamList } from "./route-types";
import routes from "./routes";

import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import ListingsScreen from "../screens/ListingsScreen";

const Stack = createStackNavigator<FeedStackParamList>();

const FeedNavigator: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      headerTintColor: colors.primary,
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
