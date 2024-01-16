import React from 'react'
import { IconButton, InputAdornment, styled } from '@mui/material'
import { Input } from './input/Input'
import { SearchIcon } from '../../assets'

const SearchInput = ({ value, onChange, ...rest }) => {
   return (
      <StyledInput
         type="text"
         placeholder="Поиск"
         value={value}
         onChange={onChange}
         {...rest}
         InputProps={{
            endAdornment: (
               <InputAdornment position="end">
                  <IconButton>
                     <SearchIcon />
                  </IconButton>
               </InputAdornment>
            ),
         }}
      />
   )
}

export default SearchInput

const StyledInput = styled(Input)(() => ({
   '.MuiOutlinedInput-root': {
      borderRadius: '25px',
      width: '43rem',
      height: '2.4rem',
      backgroundColor: '#fff',
   },
   fieldset: {
      border: 'none',
   },
}))
