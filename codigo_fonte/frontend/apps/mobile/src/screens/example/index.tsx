import { View } from "react-native";
import { Button } from "@hisius/ui";
import { styles } from "./style";

// Aqui fica a interface para as props do componente(nesse caso a prop é opcional)
interface AppProps {
  buttonText?: string; // opcional
}

//aqui o evento de clique é tipado como void
export default function example({ buttonText = "Clique aqui (Mobile)" }: AppProps) {
  const handlePress = (): void => {
    alert("Hello Mobile!");
  };


//aqui o componente Button é utilizado com as props tipadas
  return (
    <View style={styles.container}>

        <h1>botão tipado 👇</h1>
      <Button title={buttonText} onPress={handlePress} />
    </View>
  );
}

export { example };