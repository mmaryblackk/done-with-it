import React, { useEffect } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

import defaultStyles from "../../config/styles";
import Icon from "../Icon";

interface IImageInputProps {
  imageUri?: string;
  onChangeImage: (uri: string | null) => void;
}

function ImageInput({ imageUri, onChangeImage }: IImageInputProps) {
  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) {
      alert("You need permission to place photos from a camera roll");
    }
  };
  useEffect(() => {
    requestPermission();
  }, []);

  const handlePress = () => {
    if (!imageUri) selectImage();
    else
      Alert.alert("Delete", "Are you sure you want to delete this image?", [
        { text: "Yes", onPress: () => onChangeImage(null) },
        { text: "No" },
      ]);
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        quality: 0.5,
        exif: true,
      });

      if (!result.canceled) {
        const fixedImage = await ImageManipulator.manipulateAsync(
          result.assets[0].uri,
          [{ rotate: 0 }],
          { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
        );

        onChangeImage(fixedImage.uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {!imageUri ? (
          <Icon
            name="camera"
            iconColor={defaultStyles.colors.medium}
            size={80}
            backgroundColor={defaultStyles.colors.light}
          />
        ) : (
          <Image source={{ uri: imageUri }} style={styles.image} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    width: 100,
    height: 100,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImageInput;
