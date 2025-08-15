import { FormikValues, useFormikContext } from "formik";
import React from "react";
import ImageInputList from "../images/ImageInputList";
import AppErrorMessage from "./AppErrorMessage";

interface IFormImagePickerProps {
  name: string;
}

function FormImagePicker({ name }: IFormImagePickerProps) {
  const { errors, setFieldValue, touched, values } =
    useFormikContext<FormikValues>();

  const imageUris: { url: string }[] = values[name] || [];

  const handleAdd = (uri: string) => {
    setFieldValue(name, [...imageUris, { url: uri }]);
  };

  const handleRemove = (uri: string) => {
    setFieldValue(
      name,
      imageUris.filter((img: { url: string }) => img.url !== uri)
    );
  };
  return (
    <>
      <ImageInputList
        imageUris={imageUris.map((img) => img.url)}
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

export default FormImagePicker;
