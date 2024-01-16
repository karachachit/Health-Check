import { createSlice } from '@reduxjs/toolkit'
import {
   deleteDoctorThunk,
   doctorsAllThunk,
   doctorsSearchThunk,
   specialistThunk,
   statusDoctorThunk,
} from './specialistsThunk'

const initialState = {
   doctors: [],
   doctor: [],
   selectedDoctorId: null,
   selectedDoctor: null,
}

export const specialistsSlice = createSlice({
   name: 'specialists',
   initialState,
   reducers: {
      setSelectedDoctorId: (state, action) => {
         state.selectedDoctorId = action.payload
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(doctorsAllThunk.fulfilled, (state, action) => {
            state.doctors = Array.isArray(action.payload)
               ? action.payload
               : [action.payload]
         })
         .addCase(specialistThunk.fulfilled, (state, action) => {
            state.selectedDoctor = action.payload
         })

         .addCase(doctorsSearchThunk.fulfilled, (state, action) => {
            state.doctor = action.payload
            state.doctors = action.payload
         })

         .addCase(deleteDoctorThunk.fulfilled, (state, action) => {
            state.doctor = []
         })

         .addCase(statusDoctorThunk.pending, (state) => {
            state.loading = true
         })
         .addCase(statusDoctorThunk.fulfilled, (state, action) => {
            state.loading = false
            state.status = action.payload
         })
         .addCase(statusDoctorThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
         })
   },
})

export const { setSelectedDoctorId } = specialistsSlice.actions

export default specialistsSlice.reducer
