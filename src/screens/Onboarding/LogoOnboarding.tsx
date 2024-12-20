import React, { useEffect, useState } from 'react'
import { View, Image, ActivityIndicator, SafeAreaView, Dimensions, StyleSheet } from 'react-native'
import Logo from '../../images/logo.png'

const { width } = Dimensions.get('window')

const LogoOnboarding = ({ navigation }: any) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      navigation.navigate('OnboardingScreen')
    }, 3000)

    return () => clearTimeout(timer)
  }, [navigation])

  return (
    <SafeAreaView style={localStyles.container}>
      <View style={localStyles.innerContainer}>
        <Image source={Logo} style={localStyles.logo} />
        <ActivityIndicator color="#ffffff" size={20} />
      </View>
    </SafeAreaView>
  )
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DB3169',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: (width * 198) / 430,
    resizeMode: 'contain',
  },
})

export default LogoOnboarding
