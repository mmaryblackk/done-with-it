import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { FlatList, ImageSourcePropType, StyleSheet } from "react-native";

import Card from "../components/Card";
import SafeScreen from "../components/SafeScreen";
import { FeedStackParamList } from "../navigation/FeedNavigator";

import colors from "../config/colors";
import routes from "../navigation/routes";

type IListingsScreenProps = StackScreenProps<FeedStackParamList, "Listings">;

export interface IListing {
  id: number;
  title: string;
  price: number;
  image: ImageSourcePropType;
}

const listings: IListing[] = [
  {
    id: 1,
    title: "Red jacket for sale",
    price: 100,
    image: require("../assets/jacket.jpg"),
  },
  {
    id: 2,
    title: "Couch in great condition",
    price: 1000,
    image: require("../assets/couch.jpg"),
  },
];

function ListingsScreen({ navigation }: IListingsScreenProps) {
  return (
    <SafeScreen style={styles.screen}>
      <FlatList
        data={listings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subTitle={`$${item.price}`}
            image={item.image}
            onPress={() =>
              navigation.navigate(routes.LISTING_DETAILS, { item })
            }
          />
        )}
      />
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;
