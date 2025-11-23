import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Font from "expo-font";
import React, { useEffect, useState } from "react";
import Home from "./src/screens/home";
import { Profile } from "./src/screens/profile";
import Splash from "./src/screens/splash";
import Login from "./src/screens/auth";
import { QueueScreen } from "./src/screens/Queue";

const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Montserrat: require("@hisius/ui/assets/fonts/Montserrat-Regular.ttf"),
      });

      setLoaded(true);
    }

    loadFonts();
  }, []);

  if (!loaded) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator
        id={undefined}
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Queue" component={QueueScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
