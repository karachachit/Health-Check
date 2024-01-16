import { createSlice } from '@reduxjs/toolkit'
import { getProfileById } from './profileThunk'

const initialState = {
   data: {},
}

export const profileSlice = createSlice({
   name: 'profile',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getProfileById.fulfilled, (state, action) => {
         state.data = action.payload
      })
   },
})

export const updateProfile = createSlice({
   name: 'updateProfile',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(updateProfile.fulfilled, (state, action) => {
         return { ...state, ...action.payload }
      })
   },
})
