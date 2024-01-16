import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material'
import { useDispatch } from 'react-redux'
import Modal from '../../../components/UI/Modal'
import { CloseIcon, GreenPlus, RedClose } from '../../../assets'
import TimePickerNumber from '../../../components/UI/TimePickerNumber'
import Button from '../../../components/UI/Button'
import {
   changeTimesheets,
   deleteTimesheets,
} from '../../../store/schedule/scheduleThunk'
import { notify } from '../../../utils/constants/snackbar'
import StartTimes from '../../../components/UI/StartTimes'

const ChangeTemplate = ({ open, setOpen, doctorInfo, scheduleUpdate }) => {
   const [isSaved, setIsSaved] = useState(false)
   const [intervalValues, setIntervalValues] = useState([
      {
         id: Date.now(),
         newStartTimeHour: '',
         newStartTimeMinute: '',
         newEndTimeHour: '',
         newEndTimeMinute: '',
      },
   ])

   const dispatch = useDispatch()

   useEffect(() => {
      if (
         doctorInfo.times.filter((interval) => JSON.parse(interval.isAvailable))
            .length >= 8
      ) {
         setIsSaved(true)
      }
   }, [doctorInfo])

   const handleClose = () => {
      setOpen(false)
      setIsSaved(false)
      setIntervalValues([
         {
            id: Date.now(),
            newStartTimeHour: '',
            newStartTimeMinute: '',
            newEndTimeHour: '',
            newEndTimeMinute: '',
         },
      ])
   }

   const handleUpdate = () => {
      setOpen(false)
      setIsSaved(false)
      scheduleUpdate()
   }

   const handleAddInterval = () => {
      if (
         intervalValues.length < 8 &&
         intervalValues.length <
            8 -
               doctorInfo.times.filter((interval) =>
                  JSON.parse(interval.isAvailable)
               ).length
      ) {
         setIntervalValues((prevValues) => [
            ...prevValues,
            {
               id: Date.now(),
               newStartTimeHour: '',
               newStartTimeMinute: '',
               newEndTimeHour: '',
               newEndTimeMinute: '',
            },
         ])
      } else {
         notify('Максимальное число интервалов за день', 'error')
      }
   }

   const handleRemoveInterval = (index) => {
      const updatedIntervals = intervalValues.filter((_, i) => i !== index)
      setIntervalValues(updatedIntervals)
   }

   const handleTimeChange = (index, field, value) => {
      setIntervalValues((prevValues) => {
         const newValues = [...prevValues]
         newValues[index][field] =
            value === 0 ? '00' : value.toString().padStart(2, '0')

         return newValues
      })
   }

   const convertToSwaggerFormat = (intervals) => {
      return intervals.map((interval) => {
         const formatTime = (value) => value.toString().padStart(2, '0')
         const newStartTime = `${formatTime(
            interval.newStartTimeHour
         )}:${formatTime(interval.newStartTimeMinute)}`
         const newEndTime = `${formatTime(
            interval.newEndTimeHour
         )}:${formatTime(interval.newEndTimeMinute)}`
         return { newStartTime, newEndTime }
      })
   }

   const formatDate = (inputDate) => {
      const options = { day: 'numeric', month: 'long', year: 'numeric' }
      const dateObj = new Date(inputDate)
      const formattedDateWithYear = dateObj.toLocaleDateString('ru-RU', options)
      const formattedDateWithoutYear = formattedDateWithYear.replace(' г.', '')
      return formattedDateWithoutYear
   }

   const checkOverlap = (intervals) => {
      const existingIntervals = doctorInfo.times.map((interval) => {
         return {
            newStartTime: new Date(`2000-01-01T${interval.startTime}`),
            newEndTime: new Date(`2000-01-01T${interval.endTime}`),
         }
      })

      for (let i = 0; i < intervals.length; i += 1) {
         const intervalA = intervals[i]

         if (
            intervalA.newStartTimeHour !== undefined &&
            intervalA.newStartTimeMinute !== undefined &&
            intervalA.newEndTimeHour !== undefined &&
            intervalA.newEndTimeMinute !== undefined
         ) {
            const startTimeA = new Date(
               `2000-01-01T${intervalA.newStartTimeHour}:${intervalA.newStartTimeMinute}`
            )
            const endTimeA = new Date(
               `2000-01-01T${intervalA.newEndTimeHour}:${intervalA.newEndTimeMinute}`
            )

            for (let j = 0; j < existingIntervals.length; j += 1) {
               const intervalB = existingIntervals[j]
               if (
                  !(
                     endTimeA <= intervalB.newStartTime ||
                     startTimeA >= intervalB.newEndTime
                  )
               ) {
                  return true
               }
            }
         }
      }

      return false
   }

   const handleSave = () => {
      const formattedIntervals = convertToSwaggerFormat(intervalValues)

      const isEmptyTime = intervalValues.some(
         (interval) =>
            interval.newStartTimeHour === '' ||
            interval.newStartTimeMinute === '' ||
            interval.newEndTimeHour === '' ||
            interval.newEndTimeMinute === ''
      )

      if (isEmptyTime) {
         notify('Введите значения для всех интервалов', 'error')
         return
      }

      const isValid = intervalValues.every((interval) => {
         const startHour = parseInt(interval.newStartTimeHour, 10)
         const endHour = parseInt(interval.newEndTimeHour, 10)
         return (
            startHour < 22 && endHour <= 22 && startHour >= 6 && endHour >= 6
         )
      })

      if (!isValid) {
         notify('Время не должно быть в диапазоне от 22:00 до 06:00', 'error')
         return
      }

      const isMoreValid = intervalValues.every((interval) => {
         const startHour = parseInt(interval.newStartTimeHour, 10)
         const startMinute = parseInt(interval.newStartTimeMinute, 10)
         const endHour = parseInt(interval.newEndTimeHour, 10)
         const endMinute = parseInt(interval.newEndTimeMinute, 10)

         if (
            startHour > endHour ||
            (startHour === endHour && startMinute >= endMinute)
         ) {
            notify(
               'Начальное время должно быть больше конечного времени',
               'error'
            )
            return false
         }

         const startTimeInMinutes = startHour * 60 + startMinute
         const endTimeInMinutes = endHour * 60 + endMinute

         if (endTimeInMinutes - startTimeInMinutes < 30) {
            notify('Минимальная разница должна быть 30 минут', 'error')
            return false
         }

         return (
            startHour < 22 && endHour <= 22 && startHour >= 6 && endHour >= 6
         )
      })

      if (!isMoreValid) {
         return
      }

      const isOverlap = checkOverlap(intervalValues)

      if (isOverlap) {
         notify('Интервалы не могут перекрываться', 'error')
         return
      }

      dispatch(changeTimesheets({ formattedIntervals, doctorInfo }))
         .then(() => {
            setIsSaved(true)
            // notify('Успешно сохранено')
         })
         .catch(() => {
            notify('Ошибка при сохранении')
         })
   }

   const handleDelete = (id) => {
      dispatch(deleteTimesheets({ scheduleData: doctorInfo, time: id }))
         .then(() => {
            const updatedIntervals = intervalValues.filter(
               (interval) =>
                  `${interval.newStartTimeHour}:${interval.newStartTimeMinute}` !==
                  id
            )
            setIntervalValues(updatedIntervals)

            const updatedExistingTimes = doctorInfo.times.filter(
               (interval) => interval.startTime.slice(0, -3) !== id
            )
            doctorInfo.times = updatedExistingTimes

            const allStartTimesDeleted = updatedExistingTimes.length === 0
            // setIsSaved(!allStartTimesDeleted)
            if (allStartTimesDeleted) {
               setIntervalValues(() => [
                  {
                     id: Date.now(),
                     newStartTimeHour: '',
                     newStartTimeMinute: '',
                     newEndTimeHour: '',
                     newEndTimeMinute: '',
                  },
               ])
            }
         })
         .catch(() => {
            notify('Ошибка при удалении')
         })
   }

   const existingTimes = doctorInfo.times
      .filter((interval) => JSON.parse(interval.isAvailable))
      .map((interval) => (
         <div className="time" key={interval.startTime}>
            <StartTimes
               time={interval.startTime.slice(0, -3)}
               onDelete={() => handleDelete(interval.startTime.slice(0, -3))}
            />
         </div>
      ))

   const newTimes = intervalValues.map((interval) => (
      <div className="time" key={interval.id}>
         <StartTimes
            time={`${interval.newStartTimeHour}:${interval.newStartTimeMinute}`}
            onDelete={() =>
               handleDelete(
                  `${interval.newStartTimeHour}:${interval.newStartTimeMinute}`
               )
            }
         />
      </div>
   ))

   return (
      <Modal open={open} onClose={handleClose} padding="35px 45px">
         <StyledForm>
            <CloseIcon className="closeIcon" onClick={handleClose} />
            <h2>Изменить шаблон</h2>
            <div className="container">
               <div className="block">
                  <h6 className="department">Отделение:</h6>
                  <h4>{doctorInfo.doctor?.doctorPosition}</h4>
               </div>
               <div className="block">
                  <h6 className="specialist">Специалист:</h6>
                  <h4>{doctorInfo.doctor?.doctorFullName}</h4>
               </div>
               <div className="block">
                  <h6 className="date">Дата:</h6>
                  <h4>{formatDate(doctorInfo.date)}</h4>
               </div>
               <div className="block">
                  <h6 className="chartt">График:</h6>
                  {isSaved ? (
                     <div className="times">
                        {existingTimes}
                        {intervalValues[0]?.newStartTimeHour !== ''
                           ? newTimes
                           : null}
                     </div>
                  ) : (
                     <div className="charts">
                        {intervalValues.map((interval, index) => (
                           <div className="chart" key={interval.id}>
                              <TimePickerNumber
                                 variant="hours"
                                 value={interval.newStartTimeHour}
                                 onChange={(value) =>
                                    handleTimeChange(
                                       index,
                                       'newStartTimeHour',
                                       value.target.value
                                    )
                                 }
                              />
                              <TimePickerNumber
                                 value={interval.newStartTimeMinute}
                                 onChange={(value) =>
                                    handleTimeChange(
                                       index,
                                       'newStartTimeMinute',
                                       value.target.value
                                    )
                                 }
                              />
                              <span>-</span>
                              <TimePickerNumber
                                 variant="hours"
                                 value={interval.newEndTimeHour}
                                 onChange={(value) =>
                                    handleTimeChange(
                                       index,
                                       'newEndTimeHour',
                                       value.target.value
                                    )
                                 }
                              />
                              <TimePickerNumber
                                 value={interval.newEndTimeMinute}
                                 onChange={(value) =>
                                    handleTimeChange(
                                       index,
                                       'newEndTimeMinute',
                                       value.target.value
                                    )
                                 }
                              />
                              {index !== 0 && (
                                 <RedClose
                                    width="28px"
                                    height="28px"
                                    onClick={() => handleRemoveInterval(index)}
                                 />
                              )}
                           </div>
                        ))}
                     </div>
                  )}
               </div>
            </div>
            {!isSaved ? (
               <div
                  className="add-interval"
                  onClick={handleAddInterval}
                  onKeyDown={handleAddInterval}
                  role="presentation"
               >
                  <GreenPlus />
                  <h4>Добавить интервал</h4>
               </div>
            ) : null}

            <div className="buttons">
               <Button variant="normal" onClick={handleClose}>
                  ОТМЕНИТЬ
               </Button>
               {isSaved ? (
                  <Button onClick={handleUpdate}>СОХРАНИТЬ</Button>
               ) : (
                  <Button onClick={handleSave}>СОХРАНИТЬ</Button>
               )}
            </div>
         </StyledForm>
      </Modal>
   )
}

export default ChangeTemplate

const StyledForm = styled('form')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '1.2rem',
   h2: {
      textAlign: 'center',
      fontSize: '26px',
      fontWeight: '500',
   },
   '.container': {
      display: 'flex',
      flexDirection: 'column',
      gap: '25px',
      marginTop: '5%',
      h6: {
         color: '#464444',
         fontFamily: 'Manrope',
         fontSize: '1rem',
         fontWeight: '500',
         marginRight: '1rem',
      },
      '.block': {
         display: 'flex',
         gap: '1rem',
         textAlign: 'end',
         h4: {
            color: 'var(--primary-black-gray, #4D4E51)',
            fontSize: '17px',
            fontWeight: '400',
         },
         '.department': {
            marginLeft: '7px',
         },
         '.date': {
            marginLeft: '57px',
         },
         '.chartt': {
            marginLeft: '40px',
         },
      },
   },
   '.times': {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      width: '450px',
   },
   '.charts': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      justifyContent: 'center',
      gap: '14px',
      '.chart': {
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
         gap: '14px',
         svg: {
            cursor: 'pointer',
         },
      },
   },
   '.add-interval': {
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      marginLeft: '24%',
      width: '33%',
      cursor: 'pointer',
      h4: {
         color: 'var(--primary-green, #048741)',
         fontSize: '1rem',
         fontWeight: '500',
         width: '100%',
      },
   },
   '.buttons': {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '3%',
      button: {
         width: '48%',
         height: '2.7rem',
      },
   },
   '.closeIcon': {
      cursor: 'pointer',
      position: 'absolute',
      top: '1rem',
      right: '1.5rem',
   },
}))
