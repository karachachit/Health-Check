import React from 'react'
import { styled } from '@mui/material'
import { DAYS_OF_A_WEEK, months } from '../../utils/constants/commons'
import { Rating } from '../../assets'

const SpecialistCard = ({
   id,
   fullName,
   image,
   position,
   freeTimesheets,
   description,
   chooseSpecialist,
   dateChangeHandler,
}) => {
   const mappedFreeTimesheets = freeTimesheets.map((time, index) => {
      return { timeFrom: time, index }
   })

   const getDayOfWeek = (dateString) => {
      const date = new Date(dateString)
      const dayOfWeek = DAYS_OF_A_WEEK[date.getDay()]
      return dayOfWeek
   }

   const getDates = (dateString, months) => {
      const date = new Date(dateString)
      const day = date.getDate()
      const month = months[date.getMonth()]
      const dayOfWeek = getDayOfWeek(dateString)
      return `${day} ${month}, ${dayOfWeek}`
   }

   const chooseDateHandler = (time) => {
      const date = description
      const data = new Date(date)

      const day = data.getDate()
      const month = months[data.getMonth()]
      const dayOfAWeek = DAYS_OF_A_WEEK[data.getDay()]

      const obj = { day, month, dayOfAWeek, time }
      return obj
   }

   const submitDate = (image, fullName, id, time) => {
      chooseSpecialist({ image, fullName, id, position })
      const obj = chooseDateHandler(time)
      dateChangeHandler(obj)
   }

   return (
      <Card>
         <Profile
            onClick={() => chooseSpecialist({ image, fullName, id, position })}
         >
            <ImageContainer>
               <Image src={image} alt="" />
            </ImageContainer>
            <About>
               <Title>{fullName}</Title>
               <Specialist>{position}</Specialist>
               <RatingContainer>
                  <Rating />
                  <Users>166</Users>
               </RatingContainer>
            </About>
         </Profile>
         <Subtitle>
            {mappedFreeTimesheets[0].timeFrom
               ? `Ближайшее время для записи ${getDates(description, months)}`
               : 'Нету записей!'}
         </Subtitle>
         <TimeContainer>
            {mappedFreeTimesheets.map((time) => (
               <Time
                  key={time.id}
                  onClick={() => submitDate(image, fullName, id, time.timeFrom)}
               >
                  {time.timeFrom}
               </Time>
            ))}
         </TimeContainer>
      </Card>
   )
}

export default SpecialistCard

const Card = styled('div')(() => ({
   margin: '6px',
   padding: '19px 16px',
   background: '#fff',
   color: '#222222',
   fontSize: '16px',
   fontWeight: '500',
   borderRadius: '16px',
   display: 'flex',
   flexDirection: 'column',
   cursor: 'pointer',
   border: '1px solid #D9D9D9',
}))

const Profile = styled('div')(() => ({
   display: 'flex',
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
   fontSize: '16px',
   lineHeight: '19px',
}))

const Specialist = styled('p')(() => ({
   fontFamily: 'Manrope',
   fontWeight: 500,
   fontSize: '14px',
   lineHeight: '19px',
   color: '#959595',
}))

const RatingContainer = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
}))

const Users = styled('span')(() => ({
   marginLeft: '8px',
   fontFamily: 'Manrope',
   fontStyle: 'normal',
   fontWeight: 400,
   fontSize: '12px',
   lineHeight: '16px',
   color: '#707070',
}))

const Subtitle = styled('p')(() => ({
   marginTop: '12px',
   marginBottom: '10px',
   fontFamily: 'Manrope',
   fontStyle: 'normal',
   fontWeight: 400,
   fontSize: '14px',
   lineHeight: '19px',
   color: '#4D4E51',
}))

const Time = styled('div')(() => ({
   width: '98px',
   marginBottom: '6px',
   marginRight: '6px',
   padding: '8px 0',
   border: '1px solid #D9D9D9',
   borderRadius: '16px',
   fontFamily: 'Manrope',
   fontStyle: 'normal',
   fontWeight: 500,
   fontSize: '12px',
   lineHeight: '16px',
   color: '#4D4E51',
   display: 'flex',
   justifyContent: 'center',
   '&:hover': {
      backgroundColor: '#048741',
      color: '#ffffff',
      border: '1px solid #048741',
   },
}))

const TimeContainer = styled('div')(() => ({
   maxWidth: '324px',
   display: 'flex',
   flexWrap: 'wrap',
}))
