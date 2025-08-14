import React, { ReactNode } from "react";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";
import defaultStyles from "../config/styles";

interface IAppTextProps extends TextProps {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
}

function AppText({ children, style, ...otherProps }: IAppTextProps) {
  return (
    <Text style={[defaultStyles.text, style]} {...otherProps}>
      {children}
    </Text>
  );
}

export default AppText;
