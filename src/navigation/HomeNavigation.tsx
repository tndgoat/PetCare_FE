import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/Home/HomeScreen'

const Stack = createStackNavigator()

export default function HomeNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  )
}
