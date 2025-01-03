import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type LoginStatusState = {
  isLogin: boolean
  access_token: string
}

const initialState: LoginStatusState = {
  isLogin: false,
  access_token: '',
}

const LoginStatusSlice = createSlice({
  name: 'LoginStatus',
  initialState: initialState,
  reducers: {
    stateIsLogin: (state, action: PayloadAction<LoginStatusState>) => {
      state.isLogin = action.payload.isLogin
      state.access_token = action.payload.access_token
    },
    logOut: (state, action: PayloadAction<string>) => {
      state.isLogin = false
    },
  },
})

export const { stateIsLogin, logOut } = LoginStatusSlice.actions

export default LoginStatusSlice.reducer
