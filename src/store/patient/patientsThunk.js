import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'
import { notify } from '../../utils/constants/snackbar'

import { fileAxiosInstanse } from '../../config/fileAxiosInstanse'

export const fetchPatients = createAsyncThunk(
   'patients/fetchPatients',
   async (_, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get('/api/patients')
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

export const deletePatient = createAsyncThunk(
   'patients/deletePatient',
   async (patientId, { rejectWithValue, dispatch }) => {
      try {
         const response = await axiosInstance.delete(
            `/api/patients/${patientId}`
         )
         dispatch(fetchPatients())
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

export const searchPatients = createAsyncThunk(
   'patients/searchPatients',
   async (word, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`/api/patients?word=${word}`)
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

export const getPatientsResultThunk = createAsyncThunk(
   'patientsResult/getResults',
   async (userId, { rejectWithValue }) => {
      try {
         // console.log(userId)
         const response = await axiosInstance.get(
            `/api/results/forAdmin?userId=${userId}`
         )

         // console.log(response)

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

export const getPatientsAsyncThunk = createAsyncThunk(
   'patientsData/patientsById',
   async ({ patientId }, { dispatch, rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`/api/patients/${patientId}`)
         dispatch(getPatientsResultThunk(patientId))
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

export const postFile = createAsyncThunk(
   'cards/postFile',
   async (data, { rejectWithValue }) => {
      try {
         const response = await fileAxiosInstanse.post('/api/files', {
            file: data,
         })
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

export const postPatientsResultThunk = createAsyncThunk(
   'patientsResult/addResult',
   async (result, { rejectWithValue, dispatch }) => {
      try {
         const getFile = await dispatch(postFile(result.pdgFileCheque)).unwrap()
         const { data } = await axiosInstance.post('/api/results/add-result', {
            ...result,
            pdgFileCheque: getFile.link,
         })
         dispatch(getPatientsResultThunk(result.patientId))
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
