
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppStackParamList, AuthStackParamList } from "./navigation/navigation";
import AuthNavigator from "./routers/authNavigator";


const Stack = createNativeStackNavigator();

export default function App() {

    return (
      

      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
     );
  // aqui esta indo para o AuthNavigator mas pode mudar para o AppNavigator se n for mexer em nenhuma tela de autenticação
}