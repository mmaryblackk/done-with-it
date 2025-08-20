import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Image } from "react-native-expo-image-cache";

import AppText from "../components/AppText";
import { ListItem } from "../components/lists";

import colors from "../config/colors";
import { FeedStackParamList } from "../navigation/route-types";
import ContactSellerForm from "../components/ContactSellerForm";

type IListingDetailsScreenProps = StackScreenProps<
  FeedStackParamList,
  "ListingDetails"
>;

function ListingDetailsScreen({ route }: IListingDetailsScreenProps) {
  const { item } = route.params;
  const imageUrl = item.images[0].url;
  const imagePreviewUrl = item.images[0].thumbnailUrl;
  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
    >
      <Image
        style={styles.image}
        uri={imageUrl}
        tint="light"
        preview={{ uri: imagePreviewUrl }}
      />
      <View style={styles.detailsContainer}>
        <AppText style={styles.title}>{item.title}</AppText>
        <AppText style={styles.price}>${item.price}</AppText>
      </View>
      <View>
        <ListItem
          title="Maryna Kravchuk"
          subTitle="5 Listings"
          image={require("../assets/Maryna.jpg")}
        />
      </View>
      <ContactSellerForm listing={item} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  detailsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
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
});

export default ListingDetailsScreen;
