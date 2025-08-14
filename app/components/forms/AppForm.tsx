import { Formik, FormikValues } from "formik";
import React, { ReactNode } from "react";
import * as Yup from "yup";

interface IAppFormProps<T> {
  initialValues: T;
  onSubmit: (values: T) => void;
  validationSchema: Yup.Schema<T>;
  children: ReactNode;
}

function AppForm<T extends FormikValues>({
  initialValues,
  onSubmit,
  validationSchema,
  children,
}: IAppFormProps<T>) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => <>{children}</>}
    </Formik>
  );
}

export default AppForm;
