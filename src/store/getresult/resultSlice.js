import { createSlice } from '@reduxjs/toolkit'
import { getResultByResultNumber } from './resultThunk'

const initialState = {
   result: {},
}

export const resultSlice = createSlice({
   name: 'resultSlice',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(
         getResultByResultNumber.fulfilled,
         (state, { payload }) => {
            return { ...state, result: payload }
         }
      )
   },
})
