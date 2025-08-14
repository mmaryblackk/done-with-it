import React, { ComponentProps, ReactElement, useState } from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Button,
  DimensionValue,
  FlatList,
  Modal,
  StyleSheet,
  TextInputProps,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import defaultStyles from "../config/styles";
import AppText from "./AppText";
import PickerItem, { IPickerItemProps } from "./PickerItem";
import SafeScreen from "./SafeScreen";
import { ICategory } from "../config/categories";

interface IAppTextInputProps extends TextInputProps {
  selectedItem: ICategory | null;
  onSelectItem: (item: ICategory) => void;
  icon?: ComponentProps<typeof MaterialCommunityIcons>["name"];
  width?: DimensionValue;
  items: ICategory[];
  placeholder: string;
  PickerItemComponent?: React.ComponentType<IPickerItemProps>;
  numberOfColumns: number;
}

function AppPicker({
  icon,
  items,
  width = "100%",
  selectedItem,
  onSelectItem,
  placeholder,
  PickerItemComponent = PickerItem,
  numberOfColumns,
}: IAppTextInputProps) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, { width }]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={defaultStyles.colors.medium}
              style={styles.icon}
            />
          )}
          {selectedItem ? (
            <AppText style={styles.text}>{selectedItem.label}</AppText>
          ) : (
            <AppText style={styles.placeholder}>{placeholder}</AppText>
          )}
          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={defaultStyles.colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <SafeScreen>
          <Button title="Close" onPress={() => setModalVisible(false)} />
          <FlatList
            data={items}
            numColumns={numberOfColumns}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <PickerItemComponent
                item={item}
                onPress={() => {
                  setModalVisible(false);
                  onSelectItem(item);
                }}
              />
            )}
          />
        </SafeScreen>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    width: "100%",
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  text: {
    flex: 1,
  },
  placeholder: {
    color: defaultStyles.colors.medium,
    flex: 1,
  },
});

export default AppPicker;
