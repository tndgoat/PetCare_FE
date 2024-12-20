import React from 'react'
import { SafeAreaView, View, ScrollView, Image, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'

const { width } = Dimensions.get('window')

const LandingScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={localStyles.container}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
          paddingTop: 120,
        }}
      >
        <Image source={require('../../images/logop.png')} style={localStyles.logo} />
        <Text
          style={{
            color: '#101623',
            fontWeight: 'bold',
            fontSize: 22,
            marginBottom: 15,
            textAlign: 'center',
          }}
        >
          {'Let’s get started!'}
        </Text>
        <Text
          style={{
            color: '#717784',
            fontSize: 16,
            fontWeight: 'regular',
            marginBottom: 80,
            textAlign: 'center',
          }}
        >
          {'Login to enjoy the features we’ve\nprovided, and stay healthy!'}
        </Text>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            backgroundColor: '#DB3169',
            borderRadius: 32,
            paddingVertical: 22,
            marginBottom: 16,
            marginHorizontal: 60,
          }}
          onPress={() => navigation.navigate('LoginScreen')}
        >
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 16,
              fontWeight: 'bold',
            }}
          >
            {'Login'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            borderColor: '#DB3169',
            borderRadius: 32,
            borderWidth: 1,
            paddingVertical: 22,
            marginHorizontal: 60,
          }}
          onPress={() => navigation.navigate('RegisterScreen')}
        >
          <Text
            style={{
              color: '#DB3169',
              fontSize: 16,
              fontWeight: 'bold',
            }}
          >
            {'Sign Up'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: (width * 210) / 430,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
})

export default LandingScreen
