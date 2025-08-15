import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { AccountStackParamList } from "./route-types";
import routes from "./routes";

import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";

const Stack = createStackNavigator<AccountStackParamList>();

const AccountNavigator: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={routes.ACCOUNT}
      component={AccountScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name={routes.MESSAGES} component={MessagesScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
