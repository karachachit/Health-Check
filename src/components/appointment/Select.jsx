import React, { useState } from 'react'
import MenuItem from '@mui/material/MenuItem'
import { FormControl, Select, styled } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const menuProps = {
   PaperProps: {
      style: {
         minWidth: '23.1rem',
         maxHeight: 292,
         boxShadow: '0px 5px 44px 0px rgba(0, 0, 0, 0.06)',
         marginLeft: '0.7rem',
         borderRadius: '0px 0px 16px 16px',
      },
   },
}

export const SelectUI = ({
   options,
   label,
   value,
   onChange,
   placeholder,
   icon,
   ...rest
}) => {
   const [selectOpen, setSelectOpen] = useState(false)

   const openSelectHandler = () => {
      setSelectOpen((prev) => !prev)
   }

   return (
      <StyledFormControl fullWidth isOpen={selectOpen}>
         <label htmlFor="label">{label}</label>
         <Icon>{icon}</Icon>
         <SelectMui
            open={selectOpen}
            value={value}
            onChange={(e) => onChange(e)}
            IconComponent={KeyboardArrowDownIcon}
            inputProps={{ 'aria-label': 'Without label' }}
            MenuProps={menuProps}
            displayEmpty
            onClick={openSelectHandler}
            {...rest}
         >
            <StyledLabel value="">{placeholder}</StyledLabel>
            {options &&
               options.map((item) => (
                  <MenuItemStyle key={item.id} value={item.id}>
                     {item.title}
                  </MenuItemStyle>
               ))}
         </SelectMui>
      </StyledFormControl>
   )
}

const StyledFormControl = styled(FormControl)(({ isOpen }) => ({
   '.css-1i1pci7-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root.Mui-focused .MuiOutlinedInput-notchedOutline':
      {
         border: 'none',
      },
   '.MuiOutlinedInput-root': {
      borderRadius: isOpen ? '16px 16px 0px 0px' : '16px',
   },
}))

const StyledLabel = styled(FormControl)(() => ({
   display: 'none',
}))

const SelectMui = styled(Select)(() => ({
   maxWidth: '100%',
   border: '1px solid #D9D9D9',
   borderRadius: '6px',
   fontFamily: 'Manrope',
   fontWeight: 400,
   fontSize: '16px',
   lineHeight: '21.86px',
   color: '#4D4E51',
   '&:hover': {
      '& fieldset': {
         border: '1px solid #959595',
         color: '#4D4E51',
      },
   },
   '&:active': {
      '& fieldset': {
         border: '1px solid rgba(4, 135, 65, 0.8)',
         color: '#4D4E51',
      },
   },
   '&:disabled': {
      '& fieldset': {
         border: '1px solid #959595',
         color: '#4D4E51',
      },
   },
}))

const Icon = styled('span')(() => ({
   position: 'absolute',
   top: 25,
   left: 15,
   zIndex: '10',
}))

const MenuItemStyle = styled(MenuItem)(() => ({
   color: '#222222',
   fontFamily: 'Manrope',
   height: '3rem',
   marginLeft: '0.6rem',
   '&:hover': {
      background: '#DBF0E5',
   },
   '&:active': {
      background: '#DBF0E5',
   },
}))
