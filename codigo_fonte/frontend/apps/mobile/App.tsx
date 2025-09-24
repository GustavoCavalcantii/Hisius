import { StyleSheet, View } from "react-native";
import { Button } from "@hisius/ui";

export default function App() {
  return (
    <View style={styles.container}>
      <Button title="Clique aqui (Web)" onPress={() => alert("Hello Web!")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
