import styled from '@emotion/styled'
import { TextField } from '@mui/material'
import React from 'react'

const InputForm = ({ label, type, value, onChange, ...rest }) => {
   return (
      <div>
         <StyledLabel>{label}</StyledLabel>
         <StyledInput
            fullWidth
            type={type}
            value={value}
            onChange={onChange}
            size="small"
            {...rest}
         />
      </div>
   )
}

export default InputForm

const StyledInput = styled(TextField)(() => ({
   '.MuiOutlinedInput-root': {
      borderRadius: '5px',
      font: 'inherit',
      outline: 'none',
      '& fieldset': {
         borderColor: '#D9D9D9',
      },
      '&:hover fieldset': {
         borderColor: '#959595',
      },
      '&:active fieldset': {
         borderColor: 'rgba(4, 135, 65, 0.80)',
      },
      '&:invalid fieldset': {
         border: '1px solid #F91515',
      },
      '&.css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline ':
         {
            border: '1px solid #F91515',
         },
      '&.Mui-focused fieldset': {
         borderColor: 'rgba(4, 135, 65, 0.80)',
      },
      '& input:-internal-autofill-selected': {
         width: '100%',
      },
   },
}))

const StyledLabel = styled('p')(() => ({
   margin: '12px 0 6px',
   fontFamily: 'Manrope',
   fontStyle: 'normal',
   fontWeight: '400',
   fontSize: '12px',
   color: '#4D4E51',
}))
