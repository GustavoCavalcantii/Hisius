import { color } from "@hisius/ui/theme/colors";
import { StyleSheet, View } from "react-native";
import React from "react";

const styles = StyleSheet.create({
  button: {
    backgroundColor: color.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: color.front,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export { styles };