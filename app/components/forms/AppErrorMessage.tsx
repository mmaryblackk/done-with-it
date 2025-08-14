import React from "react";
import { StyleSheet } from "react-native";
import AppText from "../AppText";

interface IErrorMessageProps {
  error: string;
  visible: boolean;
}

function AppErrorMessage({ error, visible }: IErrorMessageProps) {
  if (!error || !visible) return;
  return <AppText style={styles.error}>{error}</AppText>;
}

const styles = StyleSheet.create({
  error: {
    color: "red",
  },
});

export default AppErrorMessage;
