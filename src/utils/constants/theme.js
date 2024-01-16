import { createTheme } from '@mui/material'

export const theme = createTheme({
   palette: {
      primary: {
         main: '#FFFFFF',
         black: '#222222',
         charcoal: '#4D4D51',
         lightLime: 'linear-gradient(#0CBB6B, #027B44)',
         green: '#048741',
         background: '#F5F5F5',
      },
      secondary: {
         main: '#D9D9D9',
         silver: '#E0E2E7',
         lightGray: 'linear-gradient(#FDFDFD, #E4E7EE)',
         white: '#F3F1F1',
         gray: '#959595',
         brown: '#E4772F',
      },
      tertiary: {
         main: '#FFFFFF',
         mint: '#222222',
         red: '#F91515',
         skyBlue: '#3977C0',
         blue: '#346EFB',
      },
   },
   typography: {
      fontFamily: ['Manrope', 'Poppins'],
   },
})
