import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'
import { notify } from '../../utils/constants/snackbar'

export const doctorsAllThunk = createAsyncThunk(
   'doctorsAll/doctors',
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

export const specialistThunk = createAsyncThunk(
   'specialist/doctors',
   async (doctorId, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`/api/doctors/${doctorId}`)
         return response.data
      } catch (error) {
         return rejectWithValue(error.message || 'Failed to fetch doctor data')
      }
   }
)

export const doctorsSearchThunk = createAsyncThunk(
   'doctorsSearch/doctorsWord',
   async (value, { rejectWithValue, dispatch }) => {
      try {
         const response = await axiosInstance.get(
            `/api/doctors/word?word=${value}`
         )
         if (!value) {
            dispatch(doctorsAllThunk())
         }
         return response.data
      } catch (error) {
         return rejectWithValue
      }
   }
)

export const deleteDoctorThunk = createAsyncThunk(
   'doctorsDelete/doctorsDeleteId',
   async (doctorId, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.delete(`/api/doctors/${doctorId}`)
         return dispatch(doctorsAllThunk())
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

export const statusDoctorThunk = createAsyncThunk(
   'doctorsStatus/doctorsStatusId',
   async ({ doctorId, value }, { dispatch, rejectWithValue }) => {
      try {
         const response = await axiosInstance.put(
            `/api/doctors/status?doctorId=${doctorId}&isActive=${value}`
         )
         dispatch(doctorsAllThunk())
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

export const changeDoctorThunk = createAsyncThunk(
   'changedoctors/doctorsChangeId',
   async ({ doctorId, departmentId, doctorInfo }, { dispatch }) => {
      try {
         const response = await axiosInstance.put(
            `/api/doctors/update?doctorId=${doctorId}&departmentId=${departmentId}`,
            doctorInfo
         )
         notify('Данные успешно сохранены')
         dispatch(specialistThunk(doctorId))
         return response.data
      } catch (error) {
         return error
      }
   }
)

export const postNewDoctorsThunk = createAsyncThunk(
   'patientsResult/addResult',
   async ({ dataSpecialist, departmentId, navigate }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.post(
            `/api/doctors/${departmentId}`,
            {
               ...dataSpecialist,
            }
         )

         // dispatch(doctorsAllThunk(dataSpecialist.departmentId))
         notify('Специалист успешно добавлен')
         navigate('/specialists')
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
