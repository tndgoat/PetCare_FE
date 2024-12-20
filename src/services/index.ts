import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://petcare-sdbq.onrender.com',
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState
      const token = state.LoginStatus.accessToken
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  tagTypes: ['MoneySource', 'User', 'Budget'],
  endpoints: () => ({}),
})
