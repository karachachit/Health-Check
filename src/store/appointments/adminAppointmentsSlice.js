import { createSlice } from '@reduxjs/toolkit'
import {
   StatusAppointments,
   adminAppointmentsThunk,
   deleteAppointmentsThunk,
   getAllDoctors,
   searchAppointmentsByIdAThunk,
} from './adminAppointmentsThunk'

const initialState = {
   appointmentsAdmin: [],
   status: null,
   newAppointments: [],
   doctors: [],
   isLoading: false,
   error: null,
}

export const appointmentsSlice = createSlice({
   name: 'appointmentsAdmin',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(adminAppointmentsThunk.fulfilled, (state, action) => {
            state.appointmentsAdmin = action.payload
         })
         .addCase(searchAppointmentsByIdAThunk.pending, (state) => {
            state.isLoading = true
         })
         .addCase(searchAppointmentsByIdAThunk.fulfilled, (state, action) => {
            state.isLoading = false
            state.appointmentsAdmin = action.payload
         })
         .addCase(searchAppointmentsByIdAThunk.rejected, (state) => {
            state.isLoading = false
         })
         .addCase(StatusAppointments.pending, (state) => {
            state.isLoading = true
         })
         .addCase(StatusAppointments.fulfilled, (state, action) => {
            state.isLoading = false
            state.status = action.payload
         })
         .addCase(StatusAppointments.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
         })
         .addCase(deleteAppointmentsThunk.pending, (state) => {
            state.isLoading = true
            state.error = null
         })
         .addCase(deleteAppointmentsThunk.fulfilled, (state, action) => {
            state.isLoading = false
            state.appointmentsAdmin = state.appointmentsAdmin.filter(
               (app) => app.id !== action.payload
            )
         })
         .addCase(deleteAppointmentsThunk.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
         })
         .addCase(getAllDoctors.fulfilled, (state, action) => {
            state.doctors = action.payload
         })
   },
})
