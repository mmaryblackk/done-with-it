import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";

function AppActivityIndicator({ visible = false }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../assets/animations/loader.json")}
        autoPlay
        loop
        style={{ width: 400, height: 400 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    position: "absolute",
    zIndex: 1,
    backgroundColor: "white",
    opacity: 0.8,
  },
});

export default AppActivityIndicator;
