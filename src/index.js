import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack'
import './index.css'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { theme } from './utils/constants/theme'
import { store } from './store'
import { injectStore } from './config/axiosInstance'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
   <React.StrictMode>
      <LocalizationProvider adapterLocale="ru" dateAdapter={AdapterDayjs}>
         <Provider store={injectStore(store)}>
            <BrowserRouter>
               <SnackbarProvider>
                  <ThemeProvider theme={theme}>
                     <App />
                  </ThemeProvider>
               </SnackbarProvider>
            </BrowserRouter>
         </Provider>
      </LocalizationProvider>
   </React.StrictMode>
)
