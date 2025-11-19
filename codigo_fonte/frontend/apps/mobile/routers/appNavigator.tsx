import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AttendanceScreen } from "../src/screens/Attendance";
import { TriageQueueScreen } from "../src/screens/TriageQueue";


import type { IQueuedPatient } from "../../../../backend/src/interfaces/queue/IQueuedPatient"; // <-- ajusta esse caminho

export type RootStackParamList = {
  Attendance: {
    patient: IQueuedPatient;
    estimatedWaitingTimeInMinutes: number;
  };
  TriageQueue: {
    patient: IQueuedPatient;
    estimatedWaitingTimeInMinutes: number;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// MOCK só pra você testar enquanto o back não está ligado
const mockPatient: IQueuedPatient = {
  id: 1233,
  name: "Fulano Ciclano Bezerra",
  age: 32,
  birthDate: new Date("1993-01-01"),
  cnsNumber: "123 456 789 000",
  motherName: "Maria de Tal",
  dateHourAttendance: "2025-11-17T20:00:00Z",
  gender: 0 as any, // depois você usa Gender.Male, Gender.Female etc.
  position: 1,
  attendanceId: 999,
  classification: null,
};

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="TriageQueue" // ou "TriageQueue"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Attendance"
          component={AttendanceScreen}
          initialParams={{
            patient: mockPatient,
            estimatedWaitingTimeInMinutes: 5,
          }}
        />
        <Stack.Screen
          name="TriageQueue"
          component={TriageQueueScreen}
          initialParams={{
            patient: mockPatient,
            estimatedWaitingTimeInMinutes: 5,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
