import { createSlice } from '@reduxjs/toolkit'
import { uploadFile } from './s3Thunk'

const initialState = {
   link: '',
}

export const s3Slice = createSlice({
   name: 's3File',
   initialState,
   extraReducers: (builder) =>
      builder.addCase(uploadFile.fulfilled, (state, action) => {
         state.link = action.payload
      }),
})
