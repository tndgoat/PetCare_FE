import React from 'react'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import OnboardingScreen from '../screens/Onboarding/OnboardingScreen'
import LandingScreen from '../screens/Onboarding/LandingScreen'
import HomeScreen from '../screens/Home/HomeScreen'
import LogoOnboarding from '../screens/Onboarding/LogoOnboarding'
import BottomBarNavigation from './BottomBarNavigation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector } from 'react-redux'
import { RootState } from '../store/index'
import { MenuProvider } from 'react-native-popup-menu'
import LoginScreen from '../screens/Auth/LoginScreen'
import RegisterScreen from '../screens/Auth/RegisterScreen'
const Stack = createStackNavigator()

const AppMenuProvider = () => {
  // this is temp for testing
  const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState(null)

  React.useEffect(() => {
    const fetchData = async () => {
      const appData = await AsyncStorage.getItem('isAppFirstLaunched')
      if (appData == null) {
        setIsAppFirstLaunched(true)
        AsyncStorage.setItem('isAppFirstLaunched', 'false')
      } else {
        setIsAppFirstLaunched(false)
      }
    }

    fetchData()
    // AsyncStorage.removeItem('isAppFirstLaunched');
  }, [])

  const isLogin = useSelector((state: RootState) => state.LoginStatus.isLogin)
  const onBoarding = isAppFirstLaunched != null && (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* {isAppFirstLaunched && ( */}
        <>
          <Stack.Screen name="LogoOnboarding" component={LogoOnboarding} />
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
          <Stack.Screen name="LandingScreen" component={LandingScreen} />
        </>
        {/* )} */}
        {!isLogin && (
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          </>
        )}
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )

  const mainScreen = (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={BottomBarNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )

  return <MenuProvider>{!isLogin ? onBoarding : mainScreen}</MenuProvider>
}

export default AppMenuProvider
