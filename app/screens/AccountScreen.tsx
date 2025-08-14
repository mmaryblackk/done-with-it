import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { ComponentProps } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import Icon from "../components/Icon";
import SafeScreen from "../components/SafeScreen";
import colors from "../config/colors";
import { ListItem, ListItemSeparator } from "../components/lists";
import { StackScreenProps } from "@react-navigation/stack";
import { AccountStackParamList } from "../navigation/AccountNavigator";
import { FeedStackParamList } from "../navigation/FeedNavigator";

interface IMenuItem {
  title: string;
  icon: {
    name: ComponentProps<typeof MaterialCommunityIcons>["name"];
    backgroundColor: string;
  };
  targetScreen: keyof AccountStackParamList;
}

const menuItems: IMenuItem[] = [
  {
    title: "My Listings",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
    targetScreen: "Account",
  },
  {
    title: "My Messages",
    icon: {
      name: "email",
      backgroundColor: colors.secondary,
    },
    targetScreen: "Messages",
  },
];

type IAccountScreenProps = StackScreenProps<AccountStackParamList, "Account">;

function AccountScreen({ navigation }: IAccountScreenProps) {
  return (
    <SafeScreen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title="Maryna Kravchuk"
          subTitle="marynakravchuk02@gmail.com"
          image={require("../assets/Maryna.jpg")}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>
      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
      />
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,
  },
});

export default AccountScreen;
