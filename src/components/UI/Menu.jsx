import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material'

export default function ReusableMenu({ buttonIcon, menuItems, ...rest }) {
   const [anchorEl, setAnchorEl] = React.useState(null)
   const open = Boolean(anchorEl)

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget)
   }

   const handleClose = () => {
      setAnchorEl(null)
   }

   return (
      <div>
         <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
         >
            {buttonIcon}
         </Button>
         <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
               'aria-labelledby': 'basic-button',
            }}
            {...rest}
         >
            {menuItems.map((item) => (
               <StyleMenuItem
                  key={item.id}
                  onClick={() => {
                     item.onClick()
                     handleClose()
                  }}
               >
                  {item.title}
               </StyleMenuItem>
            ))}
         </Menu>
      </div>
   )
}

const StyleMenuItem = styled(MenuItem)`
   font-family: sans-serif;
`
