import { NavigationContainerRef } from "@react-navigation/native";
import React from "react";
import { AppTabParamList } from "./route-types";

export const navigationRef =
  React.createRef<NavigationContainerRef<AppTabParamList>>();

const navigate = <RouteName extends keyof AppTabParamList>(
  name: RouteName,
  params?: AppTabParamList[RouteName]
) => {
  navigationRef.current?.navigate(name as any, params as any);
};

export default {
  navigate,
};
