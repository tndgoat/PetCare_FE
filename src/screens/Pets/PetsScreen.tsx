import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PetListScreen from "./PetListScreen";
import PetProfileScreen from "./PetProfileScreen";
import { NavigationContainer } from "@react-navigation/native";
import AddPetScreen from "./AddPet";

const Stack = createStackNavigator();

const PetsScreen: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="PetListScreen">
      <Stack.Screen
        name="PetListScreen"
        component={PetListScreen}
        options={{ title: "My Pets" }}
      />
      <Stack.Screen
        name="PetProfileScreen"
        component={PetProfileScreen}
        options={{ title: "Pet Profile" }}
      />
      <Stack.Screen
        name="AddPet"
        component={AddPetScreen}
        options={{ title: "Add Pet" }}
      />
    </Stack.Navigator>
  );
};

export default PetsScreen;
