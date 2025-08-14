import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { ComponentProps } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import CategoryPickerItem from "../components/CategoryPickerItem";
import SafeScreen from "../components/SafeScreen";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import AppFormPicker from "../components/forms/AppFormPicker";
import FormImagePicker from "../components/forms/FormImagePicker";
import { categories, ICategory } from "../config/categories";
import { useLocation } from "../hooks/useLocation";

interface IListingEditFormValues {
  title: string;
  price: number;
  description?: string;
  category: ICategory | null;
  images?: string[];
}

const validationSchema: Yup.Schema<IListingEditFormValues> = Yup.object().shape(
  {
    title: Yup.string().required().min(1).label("Title"),
    price: Yup.number().required().min(1).max(10000).label("Price"),
    description: Yup.string().label("Description"),
    category: Yup.object({
      id: Yup.number().required(),
      label: Yup.string().required(),
      icon: Yup.mixed<
        ComponentProps<typeof MaterialCommunityIcons>["name"]
      >().required(),
      backgroundColor: Yup.string().required(),
    })
      .required()
      .nullable()
      .label("Category"),
    images: Yup.array().min(1, "Please select at least one image"),
  }
);

function ListingEditScreen() {
  const location = useLocation();
  return (
    <SafeScreen style={styles.container}>
      <AppForm
        initialValues={{
          title: "",
          price: 0,
          description: "",
          category: null,
          images: [],
        }}
        onSubmit={() => console.log(location)}
        validationSchema={validationSchema}
      >
        <FormImagePicker name="images" />
        <AppFormField name="title" placeholder="Title" maxLength={255} />
        <AppFormField
          keyboardType="numeric"
          maxLength={8}
          name="price"
          placeholder="Price"
          width={120}
        />
        <AppFormPicker
          items={categories}
          numberOfColumns={3}
          name="category"
          PickerItemComponent={CategoryPickerItem}
          placeholder="Category"
          width="50%"
        />
        <AppFormField
          maxLength={255}
          multiline
          name="description"
          placeholder="Description"
          numberOfLines={3}
        />
        <SubmitButton title="Post" />
      </AppForm>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default ListingEditScreen;
