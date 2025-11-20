import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueueScreen } from "./src/screens/Queue";
import { IPatient } from "@hisius/interfaces";
import * as Font from "expo-font";
import React, { useEffect, useState } from "react";

export type RootStackParamList = {
  Queue: {
    patient: IPatient;
    estimatedWaitingTimeInMinutes: number;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const mockPatient: IPatient = {
  id: 1233,
  name: "Fulano Ciclano Bezerra",
  age: 32,
  birthDate: new Date("1993-01-01"),
  cnsNumber: "123 456 789 000",
  motherName: "Maria de Tal",
  dateHourAttendance: "2025-11-17T20:00:00Z",
  gender: 0 as any,
  position: 1,
  attendanceId: 999,
  classification: null,
};

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
        initialRouteName="Queue"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Queue"
          component={QueueScreen}
          initialParams={{
            patient: mockPatient,
            estimatedWaitingTimeInMinutes: 5,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
