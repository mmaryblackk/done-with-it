import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import CategoryPickerItem from "../components/CategoryPickerItem";
import SafeScreen from "../components/SafeScreen";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import AppFormPicker from "../components/forms/AppFormPicker";
import FormImagePicker from "../components/forms/FormImagePicker";

import { useLocation } from "../hooks/useLocation";

import categoriesApi from "../api/categories";
import listings from "../api/listings";
import { useApi } from "../hooks/useAPI";
import { ICategory, IListing } from "../types/interfaces";

export interface IListingEditFormValues {
  title: string;
  price: number;
  description?: string;
  categoryId: number;
  images: { url: string }[];
}

const validationSchema: Yup.Schema<IListingEditFormValues> = Yup.object({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  categoryId: Yup.number().required().label("Category"),
  images: Yup.array()
    .of(
      Yup.object({
        url: Yup.string().required(),
      })
    )
    .min(1, "Please select at least one image")
    .required(),
});

function ListingEditScreen() {
  const location = useLocation();

  const { request: loadCategories, data: categories } = useApi<ICategory[]>(
    categoriesApi.getCategories
  );

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSubmit = async (values: IListingEditFormValues) => {
    const result = await listings.addListing({
      ...values,
      id: +Date.now(),
      location,
    } as IListing);
    console.log(result);

    if (!result.ok) return alert("Could not save the listing.");

    alert("Success!");
  };

  return (
    <SafeScreen style={styles.container}>
      <AppForm<IListingEditFormValues>
        initialValues={{
          title: "",
          price: 0,
          description: "",
          categoryId: 0,
          images: [],
        }}
        onSubmit={handleSubmit}
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
          items={categories ?? []}
          numberOfColumns={3}
          name="categoryId"
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
