// auth.ts
import { apiSlice } from '.'
import { AuthInfo, SignInDto } from '../types'

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postLogin: builder.mutation<AuthInfo, SignInDto>({
      query: (body) => ({
        url: '/auth',
        method: 'POST',
        body: body,
      }),
    }),
    postRegister: builder.mutation({
      query: (body) => ({
        url: '/users',
        method: 'POST',
        body: body,
      }),
    }),
  }),
})

export const { usePostLoginMutation, usePostRegisterMutation } = authApiSlice
