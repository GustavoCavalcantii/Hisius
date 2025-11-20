import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../navigation/navigation";


import Login from "../src/screens/auth";
import Register from "../src/screens/register";
import Splash from "../src/screens/splash";
const Stack = createNativeStackNavigator<AuthStackParamList>();

function AuthNavigator() {
  return (
      <Stack.Navigator 
        initialRouteName="Splash" 
        screenOptions={{ headerShown: false }}
        id={undefined}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
  );
}

export default AuthNavigator;