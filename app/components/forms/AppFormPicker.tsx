import { FormikValues, useFormikContext } from "formik";
import React from "react";
import { DimensionValue } from "react-native";
import AppPicker from "../AppPicker";
import AppErrorMessage from "./AppErrorMessage";
import PickerItem, { IPickerItemProps } from "../PickerItem";
import { ICategory } from "../../types/interfaces";

interface IAppFormPickerProps {
  items: ICategory[];
  name: string;
  width?: DimensionValue;
  placeholder: string;
  numberOfColumns: number;
  PickerItemComponent?: React.ComponentType<IPickerItemProps>;
}

function AppFormPicker({
  items,
  width,
  name,
  placeholder,
  PickerItemComponent = PickerItem,
  numberOfColumns = 1,
}: IAppFormPickerProps) {
  const { errors, setFieldValue, touched, values } =
    useFormikContext<FormikValues>();
  return (
    <>
      <AppPicker
        width={width}
        items={items}
        placeholder={placeholder}
        selectedItem={items.find((i) => i.id === values[name]) as ICategory}
        onSelectItem={(item) => setFieldValue(name, item.id)}
        PickerItemComponent={PickerItemComponent}
        numberOfColumns={numberOfColumns}
      />
      <AppErrorMessage
        error={errors[name] as string}
        visible={touched[name] as boolean}
      />
    </>
  );
}

export default AppFormPicker;
