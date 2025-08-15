import { useFocusEffect } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useCallback } from "react";
import { FlatList, StyleSheet } from "react-native";

import AppActivityIndicator from "../components/AppActivityIndicator";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import Card from "../components/Card";
import SafeScreen from "../components/SafeScreen";

import listingsApi from "../api/listings";
import colors from "../config/colors";
import { useApi } from "../hooks/useAPI";
import routes from "../navigation/routes";

import { FeedStackParamList } from "../navigation/route-types";
import { IListing } from "../types/interfaces";

type IListingsScreenProps = StackScreenProps<FeedStackParamList, "Listings">;

function ListingsScreen({ navigation }: IListingsScreenProps) {
  const {
    request: loadListings,
    data: listings,
    error,
    loading,
  } = useApi<IListing[]>(listingsApi.getListings);

  useFocusEffect(
    useCallback(() => {
      loadListings();
    }, [])
  );

  return (
    <SafeScreen style={styles.screen}>
      {error && (
        <>
          <AppText>Couldn't load the listings.</AppText>
          <AppButton title="Retry" onPress={loadListings} />
        </>
      )}
      <AppActivityIndicator visible={loading} />
      <FlatList
        data={listings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subTitle={`$${item.price}`}
            imageUrl={item.images[0].url}
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
