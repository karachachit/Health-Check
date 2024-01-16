import React from 'react'
import { styled } from '@mui/material'
import { Input } from './input/Input'

const TimePickerNumber = ({ type, variant, value, ...rest }) => {
   return (
      <StyledTimePicker
         type="number"
         width="86px"
         height="40px"
         value={value}
         placeholder={variant === 'hours' ? '00 ч' : '00 м'}
         max={variant === 'hours' ? '23' : '59'}
         min="0"
         onInput={(e) => {
            e.target.value = Math.max(0, parseInt(e.target.value, 10))
               .toString()
               .slice(0, 2)
         }}
         {...rest}
      />
   )
}

export default TimePickerNumber

const StyledTimePicker = styled(Input)(() => ({
   '.MuiOutlinedInput-input': {
      padding: '0 8px 0px 16px',
   },
   'input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button':
      {
         opacity: 1,
      },
}))
