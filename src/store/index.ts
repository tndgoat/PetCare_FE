import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '../services'
import loginStatusReducer from './reducers/login.reducer'

export const store = configureStore({
  reducer: {
    LoginStatus: loginStatusReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
