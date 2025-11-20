import React, { createContext, useContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./routers/authNavigator";
import AppNavigator from "./routers/appNavigator";

const AuthContext = createContext<any>(null);

function AuthProvider({ children }: any) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setUser(null);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

function Routes() {
  const { user } = useAuth();
  return user ? <AppNavigator /> : <AuthNavigator />;
}

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
    <AuthProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </AuthProvider>
  );
}