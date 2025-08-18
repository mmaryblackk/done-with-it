import React, { useState } from "react";
import { Image, StyleSheet } from "react-native";
import * as Yup from "yup";

import {
  AppErrorMessage,
  AppForm,
  AppFormField,
  SubmitButton,
} from "../components/forms";
import SafeScreen from "../components/SafeScreen";

import authApi from "../api/auth";
import useAuth from "../auth/useAuth";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

interface ILoginInfo {
  email: string;
  password: string;
}

function LoginScreen() {
  const [loginFailed, setLoginFailed] = useState<boolean>(false);
  const { logIn } = useAuth();

  const handleSubmit = async ({ email, password }: ILoginInfo) => {
    const result = await authApi.login(email, password);
    if (!result.ok) {
      return setLoginFailed(true);
    }
    setLoginFailed(false);
    logIn(result.data as string);
  };

  return (
    <SafeScreen style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo-red.png")} />
      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppErrorMessage
          error="Invalid email and/or password."
          visible={loginFailed}
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
        <SubmitButton title="Login" />
      </AppForm>
    </SafeScreen>
  );
}

export default LoginScreen;

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
