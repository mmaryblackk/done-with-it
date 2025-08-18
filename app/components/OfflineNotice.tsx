import React from "react";
import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import AppText from "./AppText";
import colors from "../config/colors";
import { useNetInfo } from "@react-native-community/netinfo";

function OfflineNotice() {
  const netInfo = useNetInfo();

  if (netInfo.type !== "unknown" && netInfo.isInternetReachable === false) {
    return (
      <View style={styles.container}>
        <AppText style={{ color: colors.white }}>
          No Internet Connection
        </AppText>
      </View>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 1,
    top: Constants.statusBarHeight,
  },
});

export default OfflineNotice;
