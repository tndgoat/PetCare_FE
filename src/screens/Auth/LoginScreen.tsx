import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StatusBar, View, SafeAreaView, Text, StyleSheet, TouchableOpacity, Alert, TextInput, Image, Dimensions, ActivityIndicator, ScrollView } from 'react-native'
import CheckBox from 'expo-checkbox'
import Footer from '../../images/FooterLogin.png'
import Icon from '@expo/vector-icons/Fontisto'
import ColorSystem from '../../color/ColorSystem'
import { stateIsLogin } from '../../store/reducers/login.reducer'
import { usePostLoginMutation } from '../../services/auth'
import { useNavigation } from '@react-navigation/native'
import { set } from 'date-fns'
import { AntDesign } from '@expo/vector-icons'

const imageAspectRatio = 414 / 218
const scaleWidth = Dimensions.get('window').width
const scaleHeight = scaleWidth / imageAspectRatio

const LoginScreen = ({ navigation }: any) => {
  const [isCheck, setIsCheck] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [checkMail, setCheckMail] = useState(true)
  const [errorPass, setErrorPass] = useState('')
  const dispatch = useDispatch()
  let [login, { isLoading }] = usePostLoginMutation()
  const onSubmit = async () => {
    let formData = {
      email: email,
      password: password,
    }
    console.log(formData)
    let regexEmail = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    console.log(regexEmail.test(email.toLowerCase()))

    if (!regexEmail.test(email.toLowerCase())) {
      setCheckMail(false)
      return
    }

    if (!regexEmail.test(email.toLowerCase())) {
      setCheckMail(false)
    } else {
      setCheckMail(true)
    }
    formData.password === '' ? setErrorPass('Password cannot be empty') : setErrorPass('')
    console.log(checkMail)

    if (checkMail === false || formData.email === '' || formData.password === '') {
      return
    }

    try {
      console.log('login')
      const authInfo = await login(formData).unwrap()
      console.log(authInfo)
      dispatch(
        stateIsLogin({
          isLogin: true,
          accessToken: authInfo.accessToken,
          userId: authInfo.userId,
        })
      )
    } catch (error) {
      Alert.alert('Login failed', error.data.message)
      console.log(error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && isLoading === true && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={ColorSystem.primary[800]} />
        </View>
      )}
      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={styles.containerview}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'}></StatusBar>
        <View>
          <View style={styles.title}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'semibold',
                color: '#101623',
              }}
            >
              Login
            </Text>
          </View>
          <View>
            <View style={styles.form}>
              <View style={styles.group}>
                <Icon style={styles.icon} name="email" color="#DB3169" />
                <TextInput style={styles.input} autoCapitalize="none" placeholder="Enter your email" onChangeText={(value) => setEmail(value)}></TextInput>
                {!checkMail && <Text style={{ color: 'red' }}>The email you entered is invalid!</Text>}
              </View>
              <View style={styles.group}>
                <Icon style={styles.icon} name="locked" color="#DB3169" />
                <TextInput secureTextEntry={true} style={styles.input} placeholder="Enter your password" onChangeText={(value) => setPassword(value)}></TextInput>
                <Text style={{ color: 'red' }}>{errorPass}</Text>
              </View>
              <View style={styles.group1}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <CheckBox disabled={false} value={isCheck} onValueChange={() => setIsCheck(!isCheck)} color="#DB3169" />
                  <Text style={{ marginLeft: 6 }}>Remember me</Text>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert('Reset Password')
                    }}
                  >
                    <Text style={{ color: '#DB3169' }}>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity onPress={() => onSubmit()} style={styles.btn}>
                <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setEmail('')
                  setPassword('')
                  setCheckMail(true)
                  setErrorPass('')
                  navigation.navigate('RegisterScreen')
                }}
                style={styles.btnRegister}
              >
                <Text style={{ color: '#717784', fontWeight: '300', fontSize: 16 }}>Don't have an account?</Text>
                <Text style={{ color: '#DB3169', fontWeight: '600', fontSize: 16 }}> Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 16,
            }}
          >
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: '#E5E7EB',
              }}
            />
            <Text
              style={{
                marginHorizontal: 8,
                color: '#6B7280',
                fontSize: 14,
                fontWeight: 'bold',
              }}
            >
              OR
            </Text>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: '#E5E7EB',
              }}
            />
          </View>
          <View>
            <TouchableOpacity onPress={() => {}} style={styles.socialButton}>
              <AntDesign name="google" size={24} color="#DB3169" />
              <Text style={styles.socialText}>Login with Google</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} style={styles.socialButton}>
              <AntDesign name="apple1" size={24} color="#DB3169" />
              <Text style={styles.socialText}>Login with Apple</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} style={styles.socialButton}>
              <AntDesign name="facebook-square" size={24} color="#DB3169" />
              <Text style={styles.socialText}>Login with Google</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'space-between',
  },
  containerview: {
    paddingHorizontal: 30,
  },
  form: {
    marginTop: 50,
  },
  group: {
    marginTop: 15,
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  group1: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    paddingLeft: 35,
    paddingVertical: 0,
    height: 50,
    borderBottomWidth: 1,
    borderColor: 'gray',
    backgroundColor: '#fff',
  },
  btn: {
    marginTop: 30,
    backgroundColor: '#DB3169',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  btnRegister: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 10,
  },

  title: {
    marginTop: 20,
    alignItems: 'center',
  },
  icon: {
    fontSize: 25,
    position: 'absolute',
    zIndex: 5,
    top: 12,
  },
  socialButton: {
    height: 56,
    backgroundColor: '#ffffff',
    borderRadius: 32,
    borderWidth: 1,
    borderColor: '#DBDBDB',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    position: 'relative',
    marginTop: 10,
  },
  socialIcon: {
    position: 'absolute',
    left: 16,
  },
  socialText: {
    flex: 1,
    fontSize: 16,
    color: '#101623',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export default LoginScreen
