import { createSlice } from '@reduxjs/toolkit'
import { getAllSchedules } from './scheduleThunk'

const initialState = {
   isLoading: false,
   schedules: [],
}

export const scheduleSlice = createSlice({
   name: 'schedule',
   initialState,
   extraReducers: (builder) => {
      builder.addCase(getAllSchedules.pending, (state) => {
         state.isLoading = true
      })
      builder.addCase(getAllSchedules.fulfilled, (state, action) => {
         state.schedules = action.payload
         state.isLoading = false
      })
      builder.addCase(getAllSchedules.rejected, (state) => {
         state.isLoading = false
      })
   },
})
