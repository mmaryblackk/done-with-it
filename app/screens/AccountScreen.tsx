import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import React, { ComponentProps } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import Icon from "../components/Icon";
import { ListItem, ListItemSeparator } from "../components/lists";
import SafeScreen from "../components/SafeScreen";

import { AccountStackParamList } from "../navigation/route-types";

import useAuth from "../auth/useAuth";
import colors from "../config/colors";

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
    targetScreen: "Profile",
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

type IAccountScreenProps = StackScreenProps<AccountStackParamList, "Profile">;

function AccountScreen({ navigation }: IAccountScreenProps) {
  const { user, logOut } = useAuth();

  return (
    <SafeScreen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={user!.name as string}
          subTitle={user!.email as string}
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
        onPress={() => logOut()}
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
