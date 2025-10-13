import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../packages/@types/navigation"; 
import example from "apps/mobile/src/screens/example";

const Stack = createNativeStackNavigator<AppStackParamList>(); 

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home" id={undefined}>
      <Stack.Screen name="Home" component={example} />
      {/* 
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Screening" component={Screening} />
      <Stack.Screen name="Atendance" component={Atendance} />
      */}
    </Stack.Navigator>
  );
}

export default AppNavigator;