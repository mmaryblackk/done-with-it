import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import AppText from "./AppText";
import { ICategory } from "../config/categories";

export interface IPickerItemProps {
  item: ICategory;
  onPress: () => void;
}

function PickerItem({ item, onPress }: IPickerItemProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <AppText style={styles.text}>{item.label}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    padding: 20,
  },
});

export default PickerItem;
