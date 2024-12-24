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
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/index'
import { MenuProvider } from 'react-native-popup-menu'
import LoginScreen from '../screens/Auth/LoginScreen'
import RegisterScreen from '../screens/Auth/RegisterScreen'
import PetsScreen from '../screens/Clinic/ClinicScreen'
import { stateIsLogin } from '../store/reducers/login.reducer'

const Stack = createStackNavigator()

const AppMenuProvider = () => {
  const dispatch = useDispatch()
  const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState<boolean | null>(null)

  React.useEffect(() => {
    const fetchData = async () => {
      const appData = await AsyncStorage.getItem('isAppFirstLaunched')
      if (appData == null) {
        setIsAppFirstLaunched(true)
        AsyncStorage.setItem('isAppFirstLaunched', 'false')
      } else {
        setIsAppFirstLaunched(false)
      }

      const token = await AsyncStorage.getItem('access_token')
      const isLogin = await AsyncStorage.getItem('isLogin')

      if (isLogin === 'true' && token) {
        dispatch(stateIsLogin({ isLogin: true, access_token: token }))
      } else {
        dispatch(stateIsLogin({ isLogin: false, access_token: '' }))
      }
    }

    fetchData()
  }, [dispatch])

  const isLogin = useSelector((state: RootState) => state.LoginStatus.isLogin)

  const onBoarding = isAppFirstLaunched != null && (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LogoOnboarding" component={LogoOnboarding} />
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        <Stack.Screen name="LandingScreen" component={LandingScreen} />
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
