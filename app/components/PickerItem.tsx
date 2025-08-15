import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import AppText from "./AppText";

export interface IPickerItemProps {
  item: any;
  onPress: () => void;
}

function PickerItem({ item, onPress }: IPickerItemProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <AppText style={styles.text}>{item.name}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    padding: 20,
  },
});

export default PickerItem;
