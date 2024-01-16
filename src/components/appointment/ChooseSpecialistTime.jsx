import React from 'react'
import { useSelector } from 'react-redux'
import { styled } from '@mui/material'
import SpecialistCard from './SpecialistCard'

const ChooseSpecialistTime = ({ chooseSpecialist, dateChangeHandler }) => {
   const { doctorTimesheets, error } = useSelector((state) => state.appointment)
   return (
      <div>
         {error ? (
            <ErrorMessage>{error.response.data.message}</ErrorMessage>
         ) : (
            doctorTimesheets?.map((doctor) => (
               <SpecialistCard
                  key={doctor.id}
                  id={doctor.id}
                  fullName={doctor.fullName}
                  image={doctor.image}
                  position={doctor.position}
                  description={doctor.description}
                  freeTimesheets={doctor.freeTimesheets}
                  chooseSpecialist={chooseSpecialist}
                  dateChangeHandler={dateChangeHandler}
               />
            ))
         )}
      </div>
   )
}

export default ChooseSpecialistTime

const ErrorMessage = styled('p')(() => ({
   textAlign: 'center',
   fontSize: '1.1rem',
   fontWeight: '500',
   width: '23rem',
   color: 'red',
}))
