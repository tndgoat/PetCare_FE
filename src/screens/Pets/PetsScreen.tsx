import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PetListScreen from "./PetListScreen";
import PetProfileScreen from "./PetProfileScreen";
import PetForm from "./AddPet";

const Stack = createStackNavigator();

const PetsScreen: React.FC = () => {
  const [refetch, setRefetch] = useState(false);

  return (
    <Stack.Navigator initialRouteName="PetListScreen">
      <Stack.Screen
        name="PetListScreen"
        component={(props: any) => (
          <PetListScreen {...props} refetch={refetch} />
        )}
        options={{ title: "My Pets" }}
      />
      <Stack.Screen
        name="PetProfileScreen"
        component={PetProfileScreen}
        options={{ title: "Pet Profile" }}
      />
      <Stack.Screen
        name="AddPet"
        component={(props: any) => (
          <PetForm {...props} setRefetch={() => setRefetch((prev) => !prev)} />
        )}
        options={{ title: "Add Pet" }}
      />
    </Stack.Navigator>
  );
};

export default PetsScreen;
