import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'react-redux'
import { store } from './src/store'
import AppMenuProvider from './src/navigation/AppMenuProvider'
import Toast from 'react-native-toast-message'

const App = () => {
  return (
    <Provider store={store}>
      <AppMenuProvider></AppMenuProvider>
      <Toast />
    </Provider>
  )
}

export default App
