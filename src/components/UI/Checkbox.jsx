import React from 'react'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

const CheckboxUI = ({ label, checked, onChange }) => {
   return (
      <FormControlLabel
         label={label}
         control={
            <Checkbox
               checked={checked}
               onChange={onChange}
               style={{ color: 'green' }}
            />
         }
      />
   )
}

export default CheckboxUI
