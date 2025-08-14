import React from "react";
import { FormikValues, useFormikContext } from "formik";
import AppButton from "../AppButton";

interface ISubmitButtonProps {
  title: string;
}

function SubmitButton({ title }: ISubmitButtonProps) {
  const { handleSubmit } = useFormikContext<FormikValues>();
  return <AppButton title={title} onPress={handleSubmit} />;
}

export default SubmitButton;
