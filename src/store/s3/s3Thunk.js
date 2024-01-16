import { createAsyncThunk } from '@reduxjs/toolkit'
import { fileAxiosInstanse } from '../../config/fileAxiosInstanse'
import { notify } from '../../utils/constants/snackbar'

export const uploadFile = createAsyncThunk(
   's3/uploadFile',
   async (file, { rejectWithValue }) => {
      try {
         const { data } = await fileAxiosInstanse.post('/api/files', file)
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
