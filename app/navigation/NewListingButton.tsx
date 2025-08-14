import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface INewListingButtonProps {
  onPress: () => void;
}

function NewListingButton({ onPress }: INewListingButtonProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="plus-circle"
          color={colors.white}
          size={40}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderRadius: 40,
    borderWidth: 10,
    borderColor: colors.white,
    height: 80,
    width: 80,
    bottom: 20,
    left: 25,
  },
});

export default NewListingButton;
