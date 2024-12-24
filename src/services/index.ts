import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://petcare-sdbq.onrender.com/api/v1',
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState
      const token = state.LoginStatus.access_token
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  tagTypes: ['MoneySource', 'User', 'Budget'],
  endpoints: () => ({}),
})
