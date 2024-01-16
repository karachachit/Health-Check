import { createSlice } from '@reduxjs/toolkit'
import { USER_KEY } from '../../utils/constants/constants'
import { changePassword, forgotPassword, signIn, signUp } from './authThunk'

const initialState = {
   token: null,
   isAuth: false,
   role: null,
   email: null,
   error: '',
   isLoading: false,
}

const authActions = [signUp, forgotPassword, changePassword]

export const authSlice = createSlice({
   name: 'authorization',
   initialState,
   reducers: {
      login(state, action) {
         localStorage.setItem(USER_KEY, JSON.stringify(action.payload.data))
         state.isAuth = true
         state.role = action.payload.data.role
         state.token = action.payload.data.token
         state.email = action.payload.data.email
      },
      logout() {
         const newState = initialState
         localStorage.removeItem(USER_KEY)
         return newState
      },
      setAuthData(state, action) {
         return {
            ...state,
            isAuth: true,
            role: action.payload.role,
            token: action.payload.token,
            email: action.payload.email,
         }
      },
   },
   extraReducers: (builder) => {
      builder.addCase(signIn.fulfilled, (state) => {
         state.isAuth = true
      })

      authActions.forEach((action) => {
         builder
            .addCase(action.pending, (state) => {
               state.isLoading = true
            })
            .addCase(action.fulfilled, (state) => {
               state.isLoading = false
            })
            .addCase(action.rejected, (state, action) => {
               state.error = action.payload
               state.isLoading = false
            })
      })
   },
})

export const { login, register, logout, setAuthData } = authSlice.actions
