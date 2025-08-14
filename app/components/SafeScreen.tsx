import React, { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

interface ISafeScreenProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

function SafeScreen({ children, style }: ISafeScreenProps) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={[{ flex: 1, backgroundColor: "white" }, style]}>
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default SafeScreen;
