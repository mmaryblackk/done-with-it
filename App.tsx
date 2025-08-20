import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import * as Notifications from "expo-notifications";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import OfflineNotice from "./app/components/OfflineNotice";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import NavigationTheme from "./app/navigation/NavigationTheme";

import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import { IUser } from "./app/types/interfaces";
import { navigationRef } from "./app/navigation/rootNavigation";

SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function App() {
  const [user, setUser] = useState<IUser | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  const prepare = async () => {
    await restoreUser();
    setIsReady(true);
  };

  useEffect(() => {
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
        <AuthContext.Provider value={{ user, setUser }}>
          <OfflineNotice />
          <NavigationContainer ref={navigationRef} theme={NavigationTheme}>
            {user ? <AppNavigator /> : <AuthNavigator />}
          </NavigationContainer>
        </AuthContext.Provider>
      </View>
    </GestureHandlerRootView>
  );
}
