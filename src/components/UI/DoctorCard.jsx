import React from 'react'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import Button from './Button'

export default function DoctorCard({ doctor }) {
   const { id, image, firstName, lastName, position } = doctor
   return (
      <Container>
         <div key={id}>
            <Link to={`/doctors/${id}`}>
               <img src={image} alt={firstName} />
            </Link>
            <Link to={`/doctors/${id}`} className="title">
               {`${firstName} ${lastName}`}
            </Link>
            <Link to={`/doctors/${id}`} className="position">
               {position}
            </Link>
            <Button variant="outlined" type="submit">
               Записаться на прием
            </Button>
         </div>
      </Container>
   )
}
const Container = styled('div')(() => ({
   '& div': {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      width: '19rem',
      height: '26rem',
      borderRadius: '4px',
   },
   '& img': {
      width: '19rem',
      height: '20rem',
   },
   '& button': {
      padding: '10px 20px',
      borderRadius: '10px',
      marginTop: '0.5rem',
   },
   '& .title': {
      display: 'flex',
      justifyContent: 'flex-start',
      fontSize: '1.125rem',
      fontWeight: '31.25rem',
      color: 'black',
   },
   '& .position': {
      display: 'flex',
      justifyContent: 'flex-start',
      fontSize: '1rem',
      fontWeight: '31.25rem',
      color: '#959595',
   },
}))
