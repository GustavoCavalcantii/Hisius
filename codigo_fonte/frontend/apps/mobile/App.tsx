import { StyleSheet, View } from "react-native";
import { Button } from "@hisius/ui";
import { color } from "@hisius/ui/theme/colors";

export default function App() {
  return (
    <View style={styles.container}>
      <Button title="Clique aqui (Mobile)" onPress={() => alert("Hello Mobile!")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
    alignItems: "center",
    justifyContent: "center",
  },
});
