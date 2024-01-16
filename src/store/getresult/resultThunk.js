import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'
import { notify } from '../../utils/constants/snackbar'

export const getResultByResultNumber = createAsyncThunk(
   '/result/getResultByResultNumber',
   async (getResultByResultNumber, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/api/results?resultNumber=${getResultByResultNumber}`
         )
         return response.data
      } catch (error) {
         notify(error.message, 'error')
         return rejectWithValue(error)
      }
   }
)

export const getImageByName = createAsyncThunk(
   '/result/getImageByName',
   async (_, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/api/files?fileName=1701939916225creding.pdf`
         )
         return response.data
      } catch (error) {
         notify(error.message, 'error')
         return rejectWithValue(error)
      }
   }
)
