import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

import { useEffect } from "react";
import { Platform } from "react-native";

import expoPushTokensApi from "../api/expoPushTokens";

export const useNotifications = (
  notificationListener: (response: Notifications.NotificationResponse) => void
): void => {
  const registerForPushNotifications = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.log("Push notification permission not granted!");
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;

    try {
      const token = await Notifications.getExpoPushTokenAsync({ projectId });
      expoPushTokensApi.register(token.data);
    } catch (error) {
      console.log("Error getting a push token", error);
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
      });
    }
  };

  useEffect(() => {
    registerForPushNotifications();

    const subscription =
      Notifications.addNotificationResponseReceivedListener(
        notificationListener
      );

    return () => subscription.remove();
  }, []);
};
