import { createSlice } from '@reduxjs/toolkit'
import {
   fetchPatients,
   searchPatients,
   getPatientsAsyncThunk,
   getPatientsResultThunk,
   postPatientsResultThunk,
   deletePatient,
} from './patientsThunk'

export const patientSlice = createSlice({
   name: 'patients',
   initialState: {
      patients: [],
      data: null,
      results: [],
      loading: 'idle',
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchPatients.pending, (state) => {
            state.loading = 'loading'
         })
         .addCase(fetchPatients.fulfilled, (state, action) => {
            state.loading = 'succeeded'
            state.patients = action.payload
         })
         .addCase(fetchPatients.rejected, (state, action) => {
            state.loading = 'failed'
            state.error = action.payload
         })
         .addCase(searchPatients.pending, (state) => {
            state.loading = 'loading'
         })
         .addCase(searchPatients.fulfilled, (state, action) => {
            state.loading = 'succeeded'
            state.patients = action.payload
         })
         .addCase(deletePatient.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(deletePatient.fulfilled, (state, action) => {
            state.loading = false
            state.patients = state.patients.filter(
               (app) => app.id !== action.payload
            )
         })
         .addCase(deletePatient.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
         })
         .addCase(getPatientsAsyncThunk.pending, (state) => {
            state.loading = 'loading'
         })
         .addCase(getPatientsAsyncThunk.fulfilled, (state, action) => {
            state.loading = 'succeeded'
            state.data = action.payload
         })
         .addCase(getPatientsAsyncThunk.rejected, (state, action) => {
            state.loading = 'failed'
            state.error = action.error.message
         })
         .addCase(postPatientsResultThunk.pending, (state) => {
            state.loading = 'loading'
         })
         .addCase(postPatientsResultThunk.fulfilled, (state) => {
            state.loading = 'succeeded'
         })
         .addCase(postPatientsResultThunk.rejected, (state, action) => {
            state.loading = 'failed'
            state.error = action.error.message
         })
         .addCase(getPatientsResultThunk.fulfilled, (state, action) => {
            state.loading = 'succeeded'
            state.results = action.payload
         })
   },
})

export const selectPatients = (state) => state.patients.patients
export const selectPatientsLoading = (state) => state.patients.loading
export const selectPatientsError = (state) => state.patients.error
