import { createSlice } from '@reduxjs/toolkit'
import {
   fetchMyAppointments,
   fetchAppointmentById,
} from './myappointmentsThunk'

const myappointmentsSlice = createSlice({
   name: 'myappointments',
   initialState: {
      data: [],
      status: 'idle',
      error: null,
      selectedAppointment: {},
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchMyAppointments.pending, (state) => {
            state.status = 'loading'
         })
         .addCase(fetchMyAppointments.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.data = action.payload
         })
         .addCase(fetchMyAppointments.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
         })
         .addCase(fetchAppointmentById.pending, (state) => {
            state.status = 'loading'
         })
         .addCase(fetchAppointmentById.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.selectedAppointment = action.payload
         })
         .addCase(fetchAppointmentById.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
         })
   },
})

export default myappointmentsSlice.reducer
