import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { store } from "./src/store";
import AppMenuProvider from "./src/navigation/AppMenuProvider";
import Toast from "react-native-toast-message";
import * as Sentry from "@sentry/react-native";
import ScheduleScreen from "./src/screens/Schedule/ScheduleScreen";
import PetsScreen from "./src/screens/Pets/PetsScreen";
import FeedsScreen from "./src/screens/Feeds/FeedsScreen";
import HomeScreen from "./src/screens/Home/HomeScreen";
import ProfileScreen from "./src/screens/Profile/ProfileScreen";

const Stack = createStackNavigator();
Sentry.init({
  dsn: "https://e3171e9ce907fe960e53013922c95c8d@o4508501516746752.ingest.us.sentry.io/4508501518516224",
});

const App = () => {
  return (
    // <Provider store={store}>
    //   <AppMenuProvider></AppMenuProvider>
    //   <Toast />
    // </Provider>
    <ProfileScreen />
  );
};

export default Sentry.wrap(App);
