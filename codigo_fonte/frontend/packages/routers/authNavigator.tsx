import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "apps/mobile/src/screens/login";
import { AuthStackParamList } from "../../packages/@types/navigation";

const Stack = createNativeStackNavigator<AuthStackParamList>();

function AuthNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="Login" 
      screenOptions={{ headerShown: false }}
      id={undefined}
    >
      <Stack.Screen name="Login" component={Login} />
      {/* <Stack.Screen name="Register" component={Register} /> */}
    </Stack.Navigator>
  );
}

export default AuthNavigator;