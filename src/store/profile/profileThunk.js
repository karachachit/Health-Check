import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'
import { notify } from '../../utils/constants/snackbar'

export const getProfileById = createAsyncThunk(
   '/api/patients/profile',
   async (_, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get('/api/patients/profile')
         return response.data
      } catch (error) {
         const errorMessage = error.response.data.message.replace(
            /^\[|\]$/g,
            ''
         )
         notify(errorMessage, 'error')
         return rejectWithValue(error)
      }
   }
)

export const updateProfile = createAsyncThunk(
   'patients/updateProfile',
   async (userData, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.put(
            '/api/patients/updateProfile',
            userData
         )
         return response.data
      } catch (error) {
         const errorMessage = error.response.data.message.replace(
            /^\[|\]$/g,
            ''
         )
         notify(errorMessage, 'error')
         return rejectWithValue(error)
      }
   }
)

export const updatePassword = createAsyncThunk(
   'authorization/updatePassword',
   async ({ oldPassword, newPassword }) => {
      try {
         await axiosInstance.put(
            `/api/patients/updatePassword?oldPassword=${oldPassword}&newPassword=${newPassword}`
         )
      } catch (error) {
         const errorMessage = error.response.data.message.replace(
            /^\[|\]$/g,
            ''
         )
         notify(errorMessage, 'error')
      }
   }
)
