import React from "react";
import { Image, StyleSheet, View } from "react-native";
import AppText from "../components/AppText";
import { ListItem } from "../components/lists";
import colors from "../config/colors";
import { StackScreenProps } from "@react-navigation/stack";
import { FeedStackParamList } from "../navigation/FeedNavigator";

type IListingDetailsScreenProps = StackScreenProps<
  FeedStackParamList,
  "ListingDetails"
>;

function ListingDetailsScreen({ route }: IListingDetailsScreenProps) {
  const { item } = route.params;
  return (
    <View>
      <Image style={styles.image} source={item.image} />
      <View style={styles.detailsContainer}>
        <AppText style={styles.title}>{item.title}</AppText>
        <AppText style={styles.price}>${item.price}</AppText>
        <View style={styles.userContainer}>
          <ListItem
            title="Maryna Kravchuk"
            subTitle="5 Listings"
            image={require("../assets/Maryna.jpg")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  userContainer: {
    marginVertical: 40,
  },
});

export default ListingDetailsScreen;
