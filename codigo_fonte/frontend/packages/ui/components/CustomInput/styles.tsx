import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
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
    height: 50,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  inputContainerError: {
    borderColor: "#FF3B30",
  },
  input: {
    fontSize: 16,
    color: "#333",
    padding: 12,
    borderWidth: 0,
    height: "100%",
    flex: 1,
  },
  iconContainer: {
    padding: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 14,
    marginTop: 4,
    marginLeft: 4,
  },
});
