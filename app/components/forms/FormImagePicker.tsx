import { FormikValues, useFormikContext } from "formik";
import React from "react";
import { StyleSheet } from "react-native";
import ImageInputList from "../images/ImageInputList";
import AppErrorMessage from "./AppErrorMessage";

interface IFormImagePickerProps {
  name: string;
}

function FormImagePicker({ name }: IFormImagePickerProps) {
  const { errors, setFieldValue, touched, values } =
    useFormikContext<FormikValues>();

  const imageUris: string[] = values[name] || [];

  const handleAdd = (uri: string) => {
    setFieldValue(name, [...imageUris, uri]);
  };
  const handleRemove = (uri: string) => {
    setFieldValue(
      name,
      imageUris.filter((u: string) => u !== uri)
    );
  };
  return (
    <>
      <ImageInputList
        imageUris={imageUris}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
      />
      <AppErrorMessage
        error={errors[name] as string}
        visible={touched[name] as boolean}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default FormImagePicker;
