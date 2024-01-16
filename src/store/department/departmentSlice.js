import { createSlice } from '@reduxjs/toolkit'
import { getAllDepartments } from './departmentThunk'

const initialState = {
   departments: [],
   error: null,
   pending: false,
}

export const departmentSlice = createSlice({
   name: 'departmentSlice',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getAllDepartments.fulfilled, (state, { payload }) => {
            return {
               ...state,
               departments: payload?.map((department) => ({
                  id: department.id,
                  title: department.facilityName,
               })),
               error: null,
               pending: false,
            }
         })
         .addCase(getAllDepartments.pending, (state) => {
            return { ...state, pending: true, error: null }
         })
         .addCase(getAllDepartments.rejected, (state, { payload }) => {
            return { ...state, pending: false, error: payload }
         })
   },
})
