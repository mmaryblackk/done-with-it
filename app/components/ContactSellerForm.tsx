import React from "react";
import { Alert, Keyboard, StyleSheet, View } from "react-native";
import * as Notifications from "expo-notifications";
import * as Yup from "yup";

import messagesApi from "../api/messages";
import { IListing } from "../types/interfaces";
import { FormikHelpers } from "formik";
import { AppForm, AppFormField, SubmitButton } from "./forms";

interface IMessage {
  message: string;
}

const validationSchema: Yup.ObjectSchema<IMessage> = Yup.object({
  message: Yup.string().required().min(1).label("Message"),
});

function ContactSellerForm({ listing }: { listing: IListing }) {
  const handleSubmit = async (
    { message }: IMessage,
    { resetForm }: FormikHelpers<IMessage>
  ) => {
    Keyboard.dismiss();

    const result = await messagesApi.send(message, listing.id);

    if (!result.ok) {
      console.log("Error", result);
      return Alert.alert("Error", "Could not send the message");
    }

    resetForm();

    Notifications.scheduleNotificationAsync({
      content: {
        title: "Awesome!",
        body: "Your message was sent to the seller.",
      },
      trigger: null,
    });
  };

  return (
    <View style={styles.container}>
      <AppForm
        initialValues={{ message: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppFormField name="message" placeholder="Message..." maxLength={255} />
        <SubmitButton title="Contact seller" />
      </AppForm>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
});

export default ContactSellerForm;
