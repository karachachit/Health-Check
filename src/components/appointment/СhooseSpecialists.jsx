import React from 'react'
import { styled } from '@mui/material'
import { useSelector } from 'react-redux'
import { ChooseSpecialistIcon } from '../../assets'
import Specialists from './Specialists'

const ChooseSpecialist = ({ openChooseSpecialistTime }) => {
   const { doctors } = useSelector((state) => state.appointment)
   // const doctors = [
   //    {
   //       id: 1,
   //       fullName: 'Манак Елена',
   //       image: drElena,
   //       position: 'Окулист',
   //       freeTimesheets: [
   //          { id: 1, date: '2023-01-12', timeFrom: '9:30' },
   //          { id: 2, date: '2023-01-12', timeFrom: '10:00' },
   //          { id: 3, date: '2023-01-12', timeFrom: '12:30' },
   //          { id: 4, date: '2023-01-12', timeFrom: '14:30' },
   //          { id: 5, date: '2023-01-12', timeFrom: '15:00' },
   //          { id: 6, date: '2023-01-12', timeFrom: '16:00' },
   //       ],
   //    },
   //    {
   //       id: 2,
   //       fullName: 'Манак Елена',
   //       image: drElena,
   //       position: 'Окулист',
   //       freeTimesheets: [
   //          { id: 7, date: '2023-01-12', timeFrom: '9:30' },
   //          { id: 8, date: '2023-01-12', timeFrom: '10:00' },
   //          { id: 9, date: '2023-01-12', timeFrom: '12:30' },
   //          { id: 10, date: '2023-01-12', timeFrom: '14:30' },
   //          { id: 11, date: '2023-01-12', timeFrom: '15:00' },
   //          { id: 12, date: '2023-01-12', timeFrom: '16:00' },
   //       ],
   //    },
   //    {
   //       id: 3,
   //       fullName: 'Манак Елена',
   //       image: drElena,
   //       position: 'Окулист',
   //       freeTimesheets: [
   //          { id: 13, timeFrom: '9:30' },
   //          { id: 14, timeFrom: '10:00' },
   //          { id: 15, timeFrom: '12:30' },
   //          { id: 16, timeFrom: '14:30' },
   //          { id: 17, timeFrom: '15:00' },
   //          { id: 18, timeFrom: '16:00' },
   //       ],
   //    },
   // ]

   return (
      <div>
         <FreeSpecialistCard>
            <SpecialistIcon />
            <p>Любой свободный специалист</p>
         </FreeSpecialistCard>
         {doctors.map((doctor) => (
            <Specialists
               key={doctor.id}
               id={doctor.id}
               fullName={doctor.fullName}
               image={doctor.image}
               position={doctor.position}
               openChooseSpecialistTime={openChooseSpecialistTime}
            />
         ))}
      </div>
   )
}

export default ChooseSpecialist

const FreeSpecialistCard = styled('div')(() => ({
   margin: '6px',
   padding: '19px 16px',
   background: '#fff',
   color: '#222222',
   fontSize: '16px',
   fontWeight: '500',
   borderRadius: '16px',
   display: 'flex',
   alignItems: 'center',
   cursor: 'pointer',
   p: {
      fontFamily: 'Manrope',
   },
}))

const SpecialistIcon = styled(ChooseSpecialistIcon)(() => ({
   marginRight: '12px',
}))
