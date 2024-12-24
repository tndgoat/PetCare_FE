import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Toast from 'react-native-toast-message'
import { ActivityIndicator, StatusBar, View, SafeAreaView, Text, StyleSheet, TouchableOpacity, Alert, TextInput, Dimensions } from 'react-native'
import CheckBox from 'expo-checkbox'
import Icon from '@expo/vector-icons/Fontisto'
import ColorSystem from '../../color/ColorSystem'
import { stateIsLogin } from '../../store/reducers/login.reducer'
import { usePostRegisterMutation } from '../../services/auth'

const RegisterScreen = ({ navigation }: any) => {
  const [isCheck, setIsCheck] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const dispatch = useDispatch()
  const [password, setPassword] = useState('')
  const [checkMail, setCheckMail] = useState(true)
  const [checkName, setCheckName] = useState(true)
  const [errorPass, setErrorPass] = useState('')
  let [register, { isLoading }] = usePostRegisterMutation()

  const onSubmit = async () => {
    let formData = {
      name: name,
      email: email,
      password: password,
    }
    console.log(formData)
    let regexEmail = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    if (name === '') {
      setCheckName(false)
    } else {
      setCheckName(true)
    }
    if (!regexEmail.test(email.toLowerCase())) {
      setCheckMail(false)
    } else {
      setCheckMail(true)
    }
    formData.password === '' ? setErrorPass('Please enter your password!') : setErrorPass('')

    if (name === '' || checkMail === false || formData.email === '' || formData.password === '') {
      return
    }

    try {
      const authInfo = await register(formData).unwrap()
      console.log(authInfo)
      dispatch(
        stateIsLogin({
          isLogin: false,
          access_token: authInfo.access_token,
        })
      )
      navigation.navigate('LoginScreen')
      Toast.show({
        type: 'success',
        text1: 'Chúc mừng bạn đã đăng ký thành công',
        text2: 'Hãy đăng nhập để trải nghiệm ngay!',
        position: 'top',
        topOffset: Dimensions.get('window').height / 2 - 50,
      })
    } catch (error) {
      Alert.alert('Register failed', error.data.message)
      console.log(error)
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      {isLoading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={ColorSystem.primary[800]} />
        </View>
      )}
      <View style={styles.containerview}>
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
              Sign Up
            </Text>
          </View>
          <View>
            <View style={styles.form}>
              <View style={styles.group}>
                <Icon style={styles.icon} name="person" color="#DB3169" />
                <TextInput style={styles.input} autoCapitalize="none" placeholder="Enter your name" onChangeText={(value) => setName(value)}></TextInput>
                {!checkName && <Text style={{ color: 'red' }}>Please enter your name!</Text>}
              </View>
              <View style={styles.group}>
                <Icon style={styles.icon} name="email" color="#DB3169" />
                <TextInput style={styles.input} autoCapitalize="none" placeholder="Enter your email" onChangeText={(value) => setEmail(value)}></TextInput>
                {!checkMail && <Text style={{ color: 'red' }}>Email is not in correct format!</Text>}
              </View>
              <View style={styles.group}>
                <Icon style={styles.icon} name="locked" color="#DB3169" />
                <TextInput secureTextEntry={true} style={styles.input} placeholder="Enter your password" onChangeText={(value) => setPassword(value)}></TextInput>
                <Text style={{ color: 'red' }}>{errorPass}</Text>
              </View>
              <View style={styles.group1}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <CheckBox disabled={false} value={isCheck} onValueChange={() => setIsCheck(!isCheck)} color="#DB3169" />
                  <Text style={{ marginLeft: 6 }}>Agree to Terms of Service and Privacy Policy</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => onSubmit()} style={styles.btn}>
                <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}>Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')} style={styles.btnRegister}>
                <Text style={{ color: '#717784', fontWeight: '300', fontSize: 16 }}>Already have an account?</Text>
                <Text style={{ color: '#DB3169', fontWeight: '600', fontSize: 16 }}> Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
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
})

export default RegisterScreen
