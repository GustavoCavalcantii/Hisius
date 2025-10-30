import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppStackParamList } from "../navigation/navigation";
import Splash from "../src/screens/splash";

const Stack = createNativeStackNavigator<AppStackParamList>(); 

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home" id={undefined}>
      <Stack.Screen name="Home" component={Splash} />
      {/* 
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Screening" component={Screening} />
      <Stack.Screen name="Atendance" component={Atendance} />
      */}
    </Stack.Navigator>
  );
}

export default AppNavigator;