import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import ClinicHome from "./ClinicHome";
import ClinicDetail from "./ClinicDetail";
import AppointmentBooking from "./AppointmentBooking";

const Stack = createStackNavigator();

const ClinicScreen: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="PetListScreen">
      <Stack.Screen
        name="ClinicHome"
        component={ClinicHome}
        options={{ title: "Clinic Home" }}
      />
      <Stack.Screen
        name="ClinicDetail"
        component={ClinicDetail}
        options={{ title: "Clinic Detail" }}
      />
      <Stack.Screen
        name="ClinicAppoinment"
        component={AppointmentBooking}
        options={{ title: "Clinic Appoinment" }}
      />
    </Stack.Navigator>
  );
};

export default ClinicScreen;
