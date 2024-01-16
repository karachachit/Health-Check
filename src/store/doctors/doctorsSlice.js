import { createSlice } from '@reduxjs/toolkit'
import { fetchDoctors, fetchDoctorById } from './doctorsThunk'

const doctorsSlice = createSlice({
   name: 'doctors',
   initialState: {
      doctors: [],
      status: 'idle',
      error: null,
      selectedDoctor: {},
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchDoctors.pending, (state) => {
            state.status = 'loading'
         })
         .addCase(fetchDoctors.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.doctors = action.payload
         })
         .addCase(fetchDoctors.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
         })
         .addCase(fetchDoctorById.pending, (state) => {
            state.status = 'loading'
         })
         .addCase(fetchDoctorById.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.selectedDoctor = action.payload
         })
         .addCase(fetchDoctorById.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
         })
   },
})

export default doctorsSlice.reducer
