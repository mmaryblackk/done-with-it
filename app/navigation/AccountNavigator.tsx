import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import colors from "../config/colors";
import routes from "./routes";

import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";

export type AccountStackParamList = {
  Account: undefined;
  Messages: undefined;
};

const Stack = createStackNavigator<AccountStackParamList>();

const AccountNavigator: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: colors.primary,
      headerStyle: { backgroundColor: colors.white },
    }}
  >
    <Stack.Screen
      name={routes.ACCOUNT}
      component={AccountScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name={routes.MESSAGES} component={MessagesScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
