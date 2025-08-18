import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";

import colors from "../config/colors";
import AppText from "./AppText";

import { Image } from "react-native-expo-image-cache";

interface ICardProps {
  title: string;
  subTitle: string;
  imageUrl: string;
  thumbnailUrl: string;
  onPress?: () => void;
}

function Card({
  title,
  subTitle,
  imageUrl,
  thumbnailUrl,
  onPress,
}: ICardProps) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image
          tint="light"
          style={styles.image}
          preview={{ uri: thumbnailUrl }}
          uri={imageUrl}
        />
        <View style={styles.detailsContainer}>
          <AppText style={styles.title}>{title}</AppText>
          <AppText style={styles.subTitle}>{subTitle}</AppText>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    marginBottom: 7,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
});

export default Card;
