import React, { useState } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import { styled } from '@mui/material'
import { DateCalendar } from '@mui/x-date-pickers'
import { useSelector } from 'react-redux'
import {
   DAYS_OF_A_WEEK,
   daysOfWeekMap,
   months,
} from '../../utils/constants/commons'

const currentDate = new Date()
const year = currentDate.getFullYear()
const month = currentDate.getMonth() + 1
const day = currentDate.getDate()
const formattedDate = `${year}-${month}-${day}`

const ChooseDate = ({ dateChangeHandler }) => {
   const [value, setValue] = useState(dayjs(formattedDate))

   const { doctorTimesheets } = useSelector((state) => state.appointment)

   const ChooseDateHandler = (time) => {
      const data = value.$d

      const day = data.getDate()
      const month = months[data.getMonth()]
      const dayOfAWeek = DAYS_OF_A_WEEK[data.getDay()]

      const obj = { day, month, dayOfAWeek, time }
      dateChangeHandler(obj)
   }

   const mappedFreeTimesheets = doctorTimesheets[0].freeTimesheets.map(
      (time, index) => {
         return { timeFrom: time, index }
      }
   )

   const availableDates = doctorTimesheets.map((doctor) => doctor.description)

   const shouldDisableDate = (date) =>
      !availableDates.includes(date.format('YYYY-MM-DD'))

   return (
      <>
         <Container>
            <StyledDateCalendar
               value={value}
               onChange={(newValue) => setValue(newValue)}
               shouldDisableDate={shouldDisableDate}
               dayOfWeekFormatter={(_day, weekday) =>
                  daysOfWeekMap[weekday.format('dd')]
               }
               renderDay={(day, _value, DayComponentProps) => (
                  <DayComponentProps
                     onFocus={DayComponentProps.onDayFocus}
                     onBlur={DayComponentProps.onDayBlur}
                  >
                     {day.format('MMMM')}
                  </DayComponentProps>
               )}
            />
         </Container>
         <TimeContainer>
            {mappedFreeTimesheets.map((time) => (
               <Time
                  key={time.index}
                  onClick={() => ChooseDateHandler(time.timeFrom)}
               >
                  {time.timeFrom}
               </Time>
            ))}
         </TimeContainer>
      </>
   )
}

export default ChooseDate

const StyledDateCalendar = styled(DateCalendar)(() => ({
   '.MuiPickersArrowSwitcher-spacer': {
      width: '120px',
   },
   '.MuiPickersArrowSwitcher-button': {
      marginLeft: '38px',
   },
   '.MuiDayCalendar-weekDayLabel': {
      color: 'var(--primary-black, #222)',
      textAlign: 'center',
      fontFamily: 'Manrope',
      fontSize: '14px',
      fontWeight: '500',
      textTransform: 'uppercase',
   },
   '.MuiPickersCalendarHeader-label': {
      textTransform: 'capitalize',
      marginRight: '37px',
   },
   '.MuiIconButton-root-MuiPickersArrowSwitcher-button': {
      position: 'absolute',
   },
   '.MuiPickersCalendarHeader-switchViewButton': {
      display: 'none',
   },
   '.MuiPickersCalendarHeader-labelContainer': {
      marginLeft: '20%',
      order: '1',
      margin: '0',
      position: 'absolute',
      right: '100px',
   },
   '.MuiPickersDay-root': {
      borderRadius: '3px',
      height: '28px',
      marginTop: '0.5rem',
      fontWeight: '500',
      color: 'var(--primary-black-gray, #4D4E51)',
   },
   '.MuiPickersDay-root:focus.Mui-selected': {
      background: 'var(--primary-green, #048741) !important',
      color: 'white',
   },
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
   cursor: 'pointer',
   '&:hover': {
      backgroundColor: '#048741',
      color: '#ffffff',
      border: '1px solid #048741',
   },
}))

const Container = styled('div')(() => ({
   margin: '1px 0 6px',
   backgroundColor: '#fff',
}))

const TimeContainer = styled('div')(() => ({
   padding: '20px',
   width: '367px',
   display: 'flex',
   flexWrap: 'wrap',
   backgroundColor: '#fff',
   borderRadius: '16px',
   marginLeft: '6px',
}))
