import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppStackParamList, AuthStackParamList } from "../../packages/@types/navigation";
import example from "apps/mobile/src/screens/example";
import splash from "apps/mobile/src/screens/splash";
import AuthNavigator from "../../packages/routers/AuthNavigator";
import AppNavigator from "../../packages/routers/AppNavigator";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {

      setTimeout(() => {
        setIsAuthenticated(false);
        setIsLoading(false);
      }, 2000);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} id={undefined}>
          <Stack.Screen name="Splash" component={splash} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}