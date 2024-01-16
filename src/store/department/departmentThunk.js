import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'

const getAllDepartments = createAsyncThunk(
   '/departments/getAllDepartmentsThunk',
   async (_, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get('/api/departments/getAll')
         return response.data
      } catch (error) {
         return rejectWithValue(error)
      }
   }
)

export { getAllDepartments }
