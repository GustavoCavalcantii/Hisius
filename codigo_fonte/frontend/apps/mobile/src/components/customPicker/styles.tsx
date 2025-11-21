import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
    height: 50,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  inputContainerError: {
    borderColor: "#FF3B30",
  },
  textValue: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  iconContainer: {
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownIcon: {
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 14,
    marginTop: 4,
    marginLeft: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
  },
  modalContent: {
    marginHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    maxHeight: "50%",
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
});
