import { FormikValues, useFormikContext } from "formik";
import React from "react";
import { DimensionValue } from "react-native";
import AppTextInput, { IAppTextInputProps } from "../AppTextInput";
import AppErrorMessage from "./AppErrorMessage";

interface IAppFormFieldProps extends IAppTextInputProps {
  name: string;
  width?: DimensionValue;
}

function AppFormField({ name, width, ...otherProps }: IAppFormFieldProps) {
  const { setFieldValue, setFieldTouched, errors, touched, values } =
    useFormikContext<FormikValues>();
  return (
    <>
      <AppTextInput
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
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
