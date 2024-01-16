import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'
import { notify } from '../../utils/constants/snackbar'

export const fetchDoctors = createAsyncThunk(
   'doctors/fetchDoctors',
   async (_, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get('/api/doctors')

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

export const fetchDoctorById = createAsyncThunk(
   'doctors/fetchDoctorById',
   async (doctorId, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`/api/doctors/${doctorId}`)

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
