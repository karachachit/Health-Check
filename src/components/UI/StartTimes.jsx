import { styled } from '@mui/material'
import React from 'react'
import { RedClose } from '../../assets'

const StartTimes = ({ time, onDelete }) => {
   return (
      <Card>
         <h5>{time}</h5>
         <RedClose width="25" height="25" onClick={onDelete} />
      </Card>
   )
}

export default StartTimes

const Card = styled('div')(() => ({
   width: '5.7rem',
   padding: '7px 9px',
   borderRadius: '4px',
   border: '1px solid #D9D9D9',
   display: 'flex',
   alignItems: 'center',
   gap: '6px',
   h5: {
      color: 'var(--primary-black, #222)',
      fontSize: '1rem',
      fontWeight: '400',
      lineHeight: '140%',
   },
   svg: {
      cursor: 'pointer',
   },
}))
