import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home/HomeScreen";
import FeedsScreen from "../screens/Feeds/FeedsScreen";
import ClinicsScreen from "../screens/Clinic/ClinicScreen";
import ScheduleScreen from "../screens/Schedule/ScheduleScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import ColorSystem from "../color/ColorSystem";
import { useAppSelector } from "../hooks/redux";
import { RootState } from "../store";
import PetsScreen from "../screens/Pets/PetsScreen";

const Tab = createBottomTabNavigator();
export default function BottomBarNavigation() {
  const login = useAppSelector((state: RootState) => state.LoginStatus.isLogin);
  if (!login) return <></>;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }, // Background color
        tabBarActiveTintColor: ColorSystem.primary[500], // Active tab label color
        tabBarInactiveTintColor: ColorSystem.neutral[300], // Inactive tab label color
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: (props) => (
            <MaterialIcons name="home" size={props.size} color={props.color} />
          ),
        }}
      />
      <Tab.Screen
        name="Pets"
        component={PetsScreen}
        options={{
          headerShown: false,
          tabBarIcon: (props) => (
            <MaterialIcons name="pets" size={props.size} color={props.color} />
          ),
        }}
      />
      <Tab.Screen
        name="Feeds"
        component={FeedsScreen}
        options={{
          headerShown: false,
          tabBarIcon: (props) => (
            <FontAwesome
              name="newspaper-o"
              size={props.size}
              color={props.color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Clinic"
        component={ClinicsScreen}
        options={{
          headerShown: false,
          tabBarIcon: (props) => (
            <FontAwesome
              name="stethoscope"
              size={props.size}
              color={props.color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{
          headerShown: false,
          tabBarIcon: (props) => (
            <AntDesign name="calendar" size={props.size} color={props.color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: (props) => (
            <FontAwesome name="user-o" size={props.size} color={props.color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
