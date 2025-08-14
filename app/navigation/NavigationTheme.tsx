import { DefaultTheme } from "@react-navigation/native";
import defaultStyles from "../config/styles";

export default {
  ...DefaultTheme,
  color: {
    ...DefaultTheme.colors,
    primary: defaultStyles.colors.primary,
    background: defaultStyles.colors.white,
  },
};
