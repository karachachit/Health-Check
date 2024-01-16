import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'
import { notify } from '../../utils/constants/snackbar'

export const adminAppointmentsThunk = createAsyncThunk(
   'appointments/admin',
   async (_, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            '/api/appointments/getAllOnlineAppointments'
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

export const searchAppointmentsByIdAThunk = createAsyncThunk(
   'appointments/searchById',
   async (word, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/api/appointments/word?word=${word}`
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

export const StatusAppointments = createAsyncThunk(
   'statusAppointments/statusDoctors',
   async ({ id, status }, { rejectWithValue, dispatch }) => {
      try {
         const response = await axiosInstance.put(
            `/api/appointments?appointmentId=${id}&status=${status}`
         )
         dispatch(adminAppointmentsThunk())
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

export const deleteAppointmentsThunk = createAsyncThunk(
   'deleteAppointments/appointments',
   async (id, { rejectWithValue, dispatch }) => {
      try {
         const response = await axiosInstance.delete(`/api/appointments`, {
            data: id,
         })
         dispatch(adminAppointmentsThunk())
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

export const postNewAppointmentsThunk = createAsyncThunk(
   'patientsResult/addResult',
   async (formData, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.post('/api/schedules', formData)
         notify('Запись успешно добавлен')
         return data
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

export const getAllDoctors = createAsyncThunk(
   'appointment/doctors',
   async ({ departmentId }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(
            'api/appointments/getDoctorsByDepartment',
            {
               params: { departmentId },
            }
         )
         return data
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
