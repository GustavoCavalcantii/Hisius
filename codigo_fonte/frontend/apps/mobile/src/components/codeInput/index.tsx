import React, { forwardRef } from "react";
import { TextInput, TextInputProps } from "react-native";

export const CodeInputBase = forwardRef<TextInput, TextInputProps>(
  (props, ref) => <TextInput ref={ref} {...props} />
);
