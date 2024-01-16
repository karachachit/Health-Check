import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'
import { notify } from '../../utils/constants/snackbar'

export const addApplications = createAsyncThunk(
   'applications/add',
   async ({ name, phoneNumber }) => {
      try {
         await axiosInstance.post('/api/applications/add', {
            name,
            phoneNumber,
         })
         notify('Ваша заявка принята')
      } catch (error) {
         const errorMessage = error.response.data.message.replace(
            /^\[|\]$/g,
            ''
         )
         notify(errorMessage, 'error')
      }
   }
)

export const applicationsThunk = createAsyncThunk(
   'applications/users',
   async (_, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get('/api/applications/getAll')
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

export const searchApplicationByIdAsyncThunk = createAsyncThunk(
   'applications/searchById',
   async (word, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/api/applications/word?word=${word}`
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

export const fetchStatus = createAsyncThunk(
   'mySlice/fetchStatus',
   async ({ id, status }, { rejectWithValue, dispatch }) => {
      try {
         const response = await axiosInstance.post(
            `/api/applications?applicationId=${id}&isProceeded=${status}`
         )
         dispatch(applicationsThunk())
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

export const deleteAsyncThunk = createAsyncThunk(
   'deleteAsyncThunk/applications',
   async (ids, { rejectWithValue, dispatch }) => {
      try {
         const response = await axiosInstance.delete(`/api/applications`, {
            data: ids,
         })
         dispatch(applicationsThunk())
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
