import { FormikValues, useFormikContext } from "formik";
import React from "react";
import AppTextInput, { IAppTextInputProps } from "../AppTextInput";
import AppErrorMessage from "./AppErrorMessage";
import { DimensionValue } from "react-native";

interface IAppFormFieldProps extends IAppTextInputProps {
  name: string;
  width?: DimensionValue;
}

function AppFormField({ name, width, ...otherProps }: IAppFormFieldProps) {
  const { handleChange, setFieldTouched, errors, touched } =
    useFormikContext<FormikValues>();
  return (
    <>
      <AppTextInput
        onChangeText={handleChange(name)}
        onBlur={() => setFieldTouched(name)}
        width={width}
        {...otherProps}
      />
      <AppErrorMessage
        error={errors[name] as string}
        visible={touched[name] as boolean}
      />
    </>
  );
}

export default AppFormField;
