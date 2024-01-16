import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'
import { notify } from '../../utils/constants/snackbar'

export const fetchMyAppointments = createAsyncThunk(
   'myappointments/fetchMyAppointments',
   async (_, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get('/api/appointments')

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

export const fetchAppointmentById = createAsyncThunk(
   'myappointments/fetchAppointmentById',
   async (appointmentId, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/api/appointments/${appointmentId}`
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
