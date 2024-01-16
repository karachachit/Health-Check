import React, { useState } from 'react'
import { Rating, styled } from '@mui/material'
// import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import Button from '../UI/Button'
import {
   DAYS_OF_A_WEEK_TRANSLATION,
   months,
} from '../../utils/constants/commons'

import { Plus, RegisteredIcon } from '../../assets'
import ConfirmModal from './ConfirmModal'

const Registered = ({ goBack }) => {
   const [openConfirmModal, setOpenConfirmModal] = useState(false)

   // const dispatch = useDispatch()

   const { appointmentData } = useSelector((state) => state.appointment)

   const getDayOfWeekInRussian = (dayOfWeek) => {
      const firstLetterUpperCase =
         dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1).toLowerCase()

      return (
         DAYS_OF_A_WEEK_TRANSLATION[firstLetterUpperCase] ||
         firstLetterUpperCase
      )
   }

   const getDate = (date) => {
      if (date && typeof date === 'string') {
         const dateObj = new Date(date)
         const dayOfWeek = getDayOfWeekInRussian(
            dateObj.toLocaleDateString('ru-RU', { weekday: 'long' })
         )
         const day = dateObj.getDate()
         const month = months[dateObj.getMonth()]

         return `${dayOfWeek}, ${day}-${month.toLowerCase()}, ${
            appointmentData.startTimeAndEndTime
         }
         `
      }
      return ''
   }

   const cancelAppointment = () => {
      setOpenConfirmModal(true)
   }

   const handleClose = () => {
      setOpenConfirmModal(false)
   }

   return (
      <Container>
         <RegisteredIcon />
         <Submited>Вы записаны</Submited>
         <p>{getDate(appointmentData.date)}</p>
         <Profile>
            <ImageContainer>
               <Image src={appointmentData.doctorImage} alt="" />
            </ImageContainer>
            <About>
               <Title>{appointmentData.doctorFullName}</Title>
               <Specialist>{appointmentData.departmentName}</Specialist>
               <RatingContainer>
                  <Rating size="small" defaultValue={5} />
                  <Users>166</Users>
               </RatingContainer>
            </About>
         </Profile>
         <Cancel onClick={cancelAppointment}>Отменить запись</Cancel>
         <StyledButton onClick={goBack}>
            <Plus />
            Записаться еще
         </StyledButton>
         {openConfirmModal ? (
            <ConfirmModal
               handleClose={handleClose}
               appointmentData={appointmentData}
               goBack={goBack}
            />
         ) : null}
      </Container>
   )
}

export default Registered

const Container = styled('div')(() => ({
   margin: '6px',
   padding: '30px 16px',
   backgroundColor: '#fff',
   borderRadius: '16px',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   fontFamily: 'Manrope',
   p: {
      fontWeight: 500,
   },
}))

const Submited = styled('p')(() => ({
   fontFamily: 'Manrope',
   fontWeight: '600',
   fontSize: '19px',
   margin: '5px 0',
}))

const Profile = styled('div')(() => ({
   display: 'flex',
   marginRight: '5rem',
   marginTop: '20px',
   marginBottom: '40px',
}))

const ImageContainer = styled('div')(() => ({
   width: '36px',
   height: '36px',
}))

const Image = styled('img')(() => ({
   width: '100%',
   height: '100%',
   borderRadius: '50%',
}))
const About = styled('div')(() => ({
   marginLeft: '10px',
}))

const Title = styled('h4')(() => ({
   fontFamily: 'Manrope',
   fontWeight: 500,
   fontSize: '1rem',
   lineHeight: '19px',
}))

const Specialist = styled('p')(() => ({
   fontFamily: 'Manrope',
   fontWeight: 500,
   fontSize: '14px',
   lineHeight: '16px',
   color: '#959595',
   marginBottom: '3px',
}))

const RatingContainer = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
}))

const Users = styled('span')(() => ({
   marginLeft: '8px',
   fontFamily: 'Manrope',
   fontWeight: 400,
   fontSize: '12px',
   lineHeight: '16px',
   color: '#707070',
}))

const StyledButton = styled(Button)(() => ({
   display: 'flex',
   gap: '0.5rem',
   fontFamily: 'Manrope',
   marginTop: '24px',
   width: '100%',
   img: {
      marginRight: '5px',
      width: '12px',
   },
}))
const Cancel = styled('p')(() => ({
   fontFamily: 'Manrope',
   fontWeight: '500',
   color: '#ff0000',
   cursor: 'pointer',
}))
