import React, { useRef } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import ImageInput from "./ImageInput";

interface IImageInputListProps {
  imageUris: string[];
  onRemoveImage: (uri: string) => void;
  onAddImage: (uri: string) => void;
}

function ImageInputList({
  imageUris = [],
  onRemoveImage,
  onAddImage,
}: IImageInputListProps) {
  const scrollView = useRef<ScrollView | null>(null);
  return (
    <View>
      <ScrollView
        ref={scrollView}
        horizontal
        onContentSizeChange={() => scrollView.current?.scrollToEnd()}
      >
        <View style={styles.container}>
          {imageUris.map((uri) => (
            <ImageInput
              key={uri}
              imageUri={uri}
              onChangeImage={() => onRemoveImage(uri)}
            />
          ))}
          <ImageInput onChangeImage={(uri) => onAddImage(uri as string)} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
  },
});

export default ImageInputList;
