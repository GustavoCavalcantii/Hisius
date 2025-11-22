import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 0,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
    height: 56,
    flexDirection: "row",
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    flex: 1,
    minWidth: "100%",
    overflow: "hidden",
  },
  inputContainerError: {
    borderColor: "#FF3B30",
  },
  inputContainerFocused: {
    borderColor: "#007AFF",
    borderWidth: 2,
  },
  inputWrapper: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
  },
  floatingLabel: {
    position: "absolute",
    top: 6,
    left: 12,
    fontSize: 12,
    fontWeight: "500",
    color: "#007AFF",
    backgroundColor: "#fff",
    paddingHorizontal: 4,
    zIndex: 1,
  },
  input: {
    fontSize: 16,
    color: "#333",
    padding: 16,
    height: "100%",
    flex: 1,
    minWidth: 0,
    includeFontPadding: false,
    textAlignVertical: "center",
    backgroundColor: "transparent",
    borderWidth: 0,
    borderColor: "transparent",
  },
  inputWithLabel: {
    paddingTop: 20,
    paddingBottom: 12,
  },
  inputContainerDisabled: {
    backgroundColor: "#f5f5f5",
    borderColor: "#e0e0e0",
  },
  inputDisabled: {
    color: "#999",
  },
  floatingLabelDisabled: {
    color: "#999",
  },
  iconContainer: {
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    width: 48,
    height: "100%",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 14,
    marginTop: 4,
    marginLeft: 4,
  },
});
