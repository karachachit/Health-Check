import { createSlice } from '@reduxjs/toolkit'
import {
   applicationsThunk,
   deleteAsyncThunk,
   fetchStatus,
   searchApplicationByIdAsyncThunk,
} from './applicationsThunk'

const initialState = {
   applications: [],
   status: null,
   loading: false,
   error: null,
}

export const applicationsSlice = createSlice({
   name: 'applications',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(applicationsThunk.fulfilled, (state, action) => {
            state.applications = action.payload
         })
         .addCase(fetchStatus.pending, (state) => {
            state.loading = true
         })
         .addCase(fetchStatus.fulfilled, (state, action) => {
            state.loading = false
            state.status = action.payload
         })
         .addCase(fetchStatus.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
         })
         .addCase(deleteAsyncThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(deleteAsyncThunk.fulfilled, (state, action) => {
            state.loading = false
            state.applications = state.applications.filter(
               (app) => app.id !== action.payload
            )
         })
         .addCase(deleteAsyncThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
         })
         .addCase(
            searchApplicationByIdAsyncThunk.fulfilled,
            (state, action) => {
               state.loading = false
               state.applications = action.payload
            }
         )
   },
})
