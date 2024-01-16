import { Box, Drawer } from '@mui/material'
import React from 'react'
import styled from 'styled-components'

const SideDrawer = ({ open, onClose, anchor = 'right', children }) => {
   return (
      <StyledDrawer anchor={anchor} open={open} onClose={onClose}>
         <Box minWidth="380px">{children}</Box>
      </StyledDrawer>
   )
}
export default SideDrawer

const StyledDrawer = styled(Drawer)(() => ({
   '.css-1160xiw-MuiPaper-root-MuiDrawer-paper': {
      maxWidth: '26%',
   },
}))
