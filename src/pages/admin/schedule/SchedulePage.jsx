import React, { useEffect, useMemo, useState } from 'react'
import { styled } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { IconButton, InputAdornment } from '@mui/material'
import { MinusIcon, SearchIcon } from '../../../assets'
import Button from '../../../components/UI/Button'
import TableSchedule from '../../../components/UI/TableSchedule'
import DatePicker from '../../../components/UI/DatePicker'
import { getAllSchedules } from '../../../store/schedule/scheduleThunk'
import AddTemplate from './AddTemplate'
import ChangeTemplate from './ChangeTemplate'
import { Input } from '../../../components/UI/input/Input'

const SchedulePage = () => {
   const [startDate, setStartDate] = useState('')
   const [endDate, setEndDate] = useState('')
   const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false)
   const [isChangeModalOpen, setIsChangeModalOpen] = useState(false)
   const [searchValue, setSearchValue] = useState('')
   const [selectedCell, setSelectedCell] = useState({
      date: '',
      doctor: null,
      rowIndex: -1,
      times: [],
   })

   const { isLoading, schedules } = useSelector((state) => state.schedule)

   const dispatch = useDispatch()

   const startDayOfMonth = startDate.$D < 10 ? `0${startDate.$D}` : startDate.$D
   const newStartDate = `${startDate.$y}-${startDate.$M + 1}-${startDayOfMonth}`

   const endDayOfMonth = endDate.$D < 10 ? `0${endDate.$D}` : endDate.$D
   const newEndDate = `${endDate.$y}-${endDate.$M + 1}-${endDayOfMonth}`

   const getSchedules = () => {
      dispatch(
         getAllSchedules({
            dateFrom: startDate ? newStartDate : undefined,
            dateUntil: endDate ? newEndDate : undefined,
         })
      )
   }

   useEffect(() => {
      dispatch(
         getAllSchedules({
            dateFrom: startDate ? newStartDate : undefined,
            dateUntil: endDate ? newEndDate : undefined,
         })
      )
   }, [])

   useEffect(() => {
      if (startDate && endDate) {
         dispatch(
            getAllSchedules({
               dateFrom: newStartDate,
               dateUntil: newEndDate,
            })
         )
      }
   }, [dispatch, startDate, endDate])

   const currentDate = new Date()

   const daysOfWeek = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']

   const startDateHandler = (date) => {
      setStartDate(date)
   }
   const endDateHandler = (date) => {
      setEndDate(date)
   }

   const handleTemplateModalOpen = () => {
      setIsTemplateModalOpen(true)
   }

   const handleChangeModalOpen = () => {
      setIsChangeModalOpen(true)
   }

   const handleChange = (event) => {
      setSearchValue(event.target.value)
   }

   const handleCellClick = async (doctor, rowIndex, date) => {
      const times =
         doctor.dateDayTimeInfos
            .find((day) => day.dateDay === date)
            ?.timeIntervals.map((interval) => ({
               startTime: interval.startTime,
               endTime: interval.endTime,
               isAvailable: interval.isAvailable,
            })) || []

      await setSelectedCell({
         rowIndex,
         doctor,
         date,
         times,
      })
   }

   const allDatesFromSchedules = schedules.reduce((dates, doctor) => {
      doctor.dateDayTimeInfos.forEach((day) => {
         dates.push(day.dateDay)
      })
      return dates
   }, [])

   const minDate = Math.min(
      ...allDatesFromSchedules.map((date) => new Date(date).getTime())
   )
   const maxDate = Math.max(
      ...allDatesFromSchedules.map((date) => new Date(date).getTime())
   )

   const generateAllDatesInRange = (start, end) => {
      const result = []
      const currentDate = new Date(start)
      while (currentDate <= end) {
         result.push(currentDate.toISOString().split('T')[0])
         currentDate.setDate(currentDate.getDate() + 1)
      }
      return result
   }

   const uniqueDates = generateAllDatesInRange(
      new Date(minDate),
      new Date(maxDate)
   )

   const columns = useMemo(() => {
      const result = [
         {
            header: 'Специалисты',
            key: 'name',
            render: (doctor) => (
               <DoctorInfoBox>
                  <StyledDoctorImage
                     src={doctor.doctorImage}
                     alt="doctorImage"
                  />
                  <DoctorNameTitle>{doctor.doctorFullName}</DoctorNameTitle>
                  <DoctorDescriptionTitle>
                     {doctor.doctorPosition}
                  </DoctorDescriptionTitle>
               </DoctorInfoBox>
            ),
         },
      ]

      uniqueDates.forEach((date) => {
         const currentDate = new Date(date)
         const correctedDayOfWeek =
            currentDate.getDay() === 0 ? 7 : currentDate.getDay()
         const header = `${
            daysOfWeek[correctedDayOfWeek - 1]
         } ${currentDate.getDate()} ${new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate()
         ).toLocaleString('ru-RU', { month: 'long' })}`

         result.push({
            header,
            key: date,
            render: (doctor) => {
               const daySchedule = doctor.dateDayTimeInfos.find(
                  (day) => day.dateDay === date
               )

               return (
                  <TimeBox
                     key={date}
                     hasTime={
                        daySchedule && daySchedule.timeIntervals.length > 0
                     }
                     timeIntervals={daySchedule && daySchedule.timeIntervals}
                  >
                     {daySchedule &&
                        daySchedule.timeIntervals.map((interval) => (
                           <p
                              key={`${date}-${interval.startTime}-${interval.endTime}`}
                           >
                              {interval.startTime.slice(0, -3)} -{' '}
                              {interval.endTime.slice(0, -3)}
                           </p>
                        ))}
                  </TimeBox>
               )
            },
         })
      })

      return result
   }, [currentDate, uniqueDates])
   return (
      <Container>
         <div className="style-nav">
            <h3>Онлайн-запись</h3>
            <ul>
               <li>
                  <StyledeNavLink
                     to="/online-registration"
                     activeClassName="active"
                  >
                     ОНЛАЙН-ЗАПИСЬ
                  </StyledeNavLink>
               </li>
               <li>
                  <StyledNavLink
                     to="/online-registration/schedule"
                     activeClassName="active"
                  >
                     РАСПИСАНИЕ
                  </StyledNavLink>
               </li>
            </ul>
         </div>
         <StyledInput
            type="text"
            placeholder="Поиск"
            value={searchValue}
            onChange={handleChange}
            InputProps={{
               endAdornment: (
                  <InputAdornment position="end">
                     <IconButton>
                        <SearchIcon />
                     </IconButton>
                  </InputAdornment>
               ),
            }}
         />
         <Box>
            <div>
               <ButtonsStyled
                  disabled={
                     !selectedCell.date ||
                     selectedCell.times.filter((interval) =>
                        JSON.parse(interval.isAvailable)
                     ).length === 0
                  }
                  onClick={handleChangeModalOpen}
               >
                  Изменить день
               </ButtonsStyled>
               <ButtonsStyled
                  disabled={
                     !selectedCell.date ||
                     selectedCell.times.filter((interval) =>
                        JSON.parse(interval.isAvailable)
                     ).length !== 0
                  }
                  onClick={handleTemplateModalOpen}
               >
                  Установить по шаблону
               </ButtonsStyled>
            </div>
            <div className="info">
               <div className="inner-block">
                  <div className="blue-block" /> <span>- Свободное время</span>
               </div>
               <div className="inner-block">
                  <div className="green-block" />
                  <span>- Не свободное время</span>
               </div>
            </div>
            <div>
               <DatePicker value={startDate} onChange={startDateHandler} />

               <MinusIcon />

               <DatePicker value={endDate} onChange={endDateHandler} />
            </div>
         </Box>
         {isLoading ? (
            <h1>Loading...</h1>
         ) : (
            <>
               <GlobalContainer>
                  <TableBox>
                     <TableSchedule
                        columns={columns}
                        rows={schedules}
                        onCellClick={handleCellClick}
                        selectedCell={selectedCell}
                     />
                  </TableBox>
               </GlobalContainer>
               <AddTemplate
                  open={isTemplateModalOpen}
                  setOpen={setIsTemplateModalOpen}
                  doctorInfo={selectedCell}
                  scheduleUpdate={getSchedules}
               />
               <ChangeTemplate
                  open={isChangeModalOpen}
                  setOpen={setIsChangeModalOpen}
                  doctorInfo={selectedCell}
                  scheduleUpdate={getSchedules}
               />
            </>
         )}
      </Container>
   )
}

export default SchedulePage

const Container = styled('div')(() => ({
   paddingTop: 'calc(11vh + 3rem)',
   padding: 'calc(11vh + 3rem) 4% 3.8vh 4%',
   backgroundColor: '#F5F5F5',
   height: '101vh',
   '.style-nav': {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '3rem',
      ul: {
         display: 'flex',
         gap: '40px',
      },
      li: {
         listStyle: 'none',
      },
      h3: {
         fontSize: '24px',
         fontWeight: '500',
         marginBottom: '1.5rem',
      },
   },
}))

const StyledInput = styled(Input)(() => ({
   '.MuiOutlinedInput-root': {
      borderRadius: '25px',
      width: '43rem',
      height: '2.4rem',
      backgroundColor: '#fff',
   },
   fieldset: {
      border: 'none',
   },
}))

const StyledDoctorImage = styled('img')(() => ({
   width: '46px',
   height: '46px',
   borderRadius: '50%',
}))
const ButtonsStyled = styled(Button)(({ disabled }) => ({
   '&': {
      padding: '8px 20px 9px 20px',
      color: '#FFFF',
      background: '#048741',
      borderRadius: '4px',
      marginLeft: '20px',
   },
   '&:hover': {
      color: disabled ? '#4D4E51' : '#FFFF',
      background: disabled ? '#E0E2E7' : '#048741',
   },
   '&:disabled': {
      background: '#E0E2E7',
      color: '#4D4E51',
   },
}))
const Box = styled('div')`
   display: flex;
   justify-content: space-between;
   background-color: #fff;
   padding: 20px 20px 20px 0;
   margin-top: 1.5rem;
   .info {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
   }
   .inner-block {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;
      span {
         font-weight: 500;
      }
   }
   .blue-block {
      width: 30px;
      height: 30px;
      background-color: #a7cdfc;
      border-radius: 50%;
   }
   .green-block {
      width: 30px;
      height: 30px;
      background-color: #048741;
      border-radius: 50%;
   }
`
const GlobalContainer = styled('div')`
   background-color: #fff;
   padding: 10px 0;
   height: 100vh;
`

const StyledNavLink = styled(NavLink)`
   text-decoration: none;
   font-size: 13px;
   font-weight: 600;
   color: #707070;
   border-bottom: 2px solid transparent;
   padding-bottom: 1.6vh;
   &:active {
      color: #048741;
   }
   &.active {
      border-color: #048741;
      color: #048741;
   }
`

const StyledeNavLink = styled(NavLink)`
   text-decoration: none;
   font-size: 13px;
   font-weight: 600;
   color: #707070;
   border-bottom: 2px solid transparent;
   padding-bottom: 1.6vh;
   &:active {
      color: #048741;
   }
`

const TableBox = styled('div')`
   table {
      font-family: Manrope;
      width: 100%;
   }
   table,
   th,
   td {
      border: 1px solid #d9d9d9;
      border-collapse: collapse;
   }
   td:first-child {
      padding: 25px 25px 55px 25px;
      img {
         margin-bottom: 0.7rem;
      }
      div {
         width: 155px;
      }
   }
   td:not(:first-child) {
      padding: 7px !important;
      width: 150px;
      vertical-align: top;
   }
   th:first-child {
      h3 {
         color: var(--primary-black-gray, #4d4e51);
         text-transform: uppercase;
      }
   }
   .MuiTableContainer-root {
      height: 100vh;
   }
`
const DoctorInfoBox = styled('div')`
   display: flex;
   flex-direction: column;
   align-items: center;
   font-family: Manrope;
   font-weight: 500;
`
const DoctorNameTitle = styled('p')`
   font-size: 15px;
   color: #222222;
`
const DoctorDescriptionTitle = styled('p')`
   font-size: 13px;
   line-height: 16.39px;
   color: #959595;
`
const TimeBox = styled('div')`
   ${(props) =>
      props.hasTime &&
      `
      background: ${
         props.timeIntervals.every(
            (interval) => interval.isAvailable === 'false'
         )
            ? 'var(--Primary-green, #048741)'
            : '#dbebff'
      };
      border-left: ${
         props.timeIntervals.every(
            (interval) => interval.isAvailable === 'false'
         )
            ? '3px solid red'
            : '3px solid #1f6ed4'
      };
   `}
   color: #1f6ed4;
   width: 110px;
   font-style: italic;
   font-weight: 500;
   padding: 5px;

   p {
      ${(props) =>
         props.hasTime &&
         props.timeIntervals &&
         props.timeIntervals.map(
            (interval) =>
               interval.isAvailable === 'false' &&
               `
               &:nth-child(${props.timeIntervals.indexOf(interval) + 1}) {
                  background: #048741;
                  color: white;
                  width: 6.7rem;
                  margin-left: -0.3rem;
               }
            `
         )}
   }
`
