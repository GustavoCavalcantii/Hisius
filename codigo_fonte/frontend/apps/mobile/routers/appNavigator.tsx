import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppStackParamList } from "../navigation/navigation";
import Splash from "../src/screens/splash";
import Home from "../src/screens/home";
// import Profile from "../src/screens/profile";
// import Screening from "../src/screens/screening";
// import Atendance from "../src/screens/atendance";

const Stack = createNativeStackNavigator<AppStackParamList>(); 

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home" id={undefined}>
      <Stack.Screen name="Home" component={Home} />
      {/* 
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Screening" component={Screening} />
      <Stack.Screen name="Atendance" component={Atendance} />
      */}
    </Stack.Navigator>
  );
}

export default AppNavigator;