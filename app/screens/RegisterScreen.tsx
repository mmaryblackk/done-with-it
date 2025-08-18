import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import {
  AppErrorMessage,
  AppForm,
  AppFormField,
  SubmitButton,
} from "../components/forms";
import SafeScreen from "../components/SafeScreen";
import { IUserInfo } from "../types/interfaces";
import usersApi from "../api/users";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";
import { useApi } from "../hooks/useAPI";
import AppActivityIndicator from "../components/AppActivityIndicator";

const validationSchema: Yup.Schema<IUserInfo> = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function RegisterScreen() {
  const registerApi = useApi(usersApi.register);
  const loginApi = useApi(authApi.login);
  const auth = useAuth();
  const [error, setError] = useState<string>("");

  const handleSubmit = async (userInfo: IUserInfo) => {
    const result = await registerApi.request(userInfo);
    if (!result.ok) {
      if (result.data) setError(result.data.error);
      else {
        setError("An unexpected error occured.");
        console.log(result);
      }
      return;
    }
    const { data: authToken } = await loginApi.request(
      userInfo.email,
      userInfo.password
    );
    auth.logIn(authToken as string);
  };

  return (
    <>
      <AppActivityIndicator visible={registerApi.loading || loginApi.loading} />
      <SafeScreen style={styles.container}>
        <AppForm<IUserInfo>
          initialValues={{ name: "", email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AppErrorMessage error={error} visible={!!error} />
          <AppFormField
            name="name"
            autoCapitalize="words"
            autoCorrect={false}
            placeholder="Name"
            icon="account"
            textContentType="name"
          />
          <AppFormField
            name="email"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Email"
            icon="email"
            keyboardType="email-address"
            textContentType="emailAddress"
          />
          <AppFormField
            name="password"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Password"
            icon="lock"
            keyboardType="email-address"
            textContentType="password"
            secureTextEntry
          />
          <SubmitButton title="Register" />
        </AppForm>
      </SafeScreen>
    </>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
  container: { padding: 10 },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});
