import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import defaultStyles from "../../config/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface IListItemDeleteActionProps {
  onPress: () => void;
}

function ListItemDeleteAction({ onPress }: IListItemDeleteActionProps) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="trash-can"
          size={35}
          color={defaultStyles.colors.white}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.danger,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ListItemDeleteAction;
