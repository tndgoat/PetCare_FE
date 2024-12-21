import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PetListScreen from "./PetListScreen";
import PetProfileScreen from "./PetProfileScreen";

const Stack = createStackNavigator();

const PetsScreen: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="PetListScreen">
      <Stack.Screen
        name="PetListScreen"
        component={PetListScreen}
        options={{ title: "Pet List" }}
      />
      <Stack.Screen
        name="PetProfileScreen"
        component={PetProfileScreen}
        options={{ title: "Pet Profile" }}
      />
    </Stack.Navigator>
  );
};

export default PetsScreen;
