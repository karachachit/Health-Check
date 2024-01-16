import React, { useState } from 'react'
import { styled } from '@mui/material'
import { useDispatch } from 'react-redux'
import Modal from '../../../components/UI/Modal'
import { CloseIcon, GreenPlus, RedClose } from '../../../assets'
import TimePickerNumber from '../../../components/UI/TimePickerNumber'
import Button from '../../../components/UI/Button'
import { addTimesheets } from '../../../store/schedule/scheduleThunk'
import { notify } from '../../../utils/constants/snackbar'

const AddTemplate = ({ open, setOpen, doctorInfo, scheduleUpdate }) => {
   const [intervalValues, setIntervalValues] = useState([
      {
         id: 1,
         newStartTimeHour: '',
         newStartTimeMinute: '',
         newEndTimeHour: '',
         newEndTimeMinute: '',
      },
   ])

   const dispatch = useDispatch()

   const handleClose = () => {
      setOpen(false)
   }

   const handleUpdate = () => {
      setOpen(false)
      scheduleUpdate()
   }
   const availableSlots = 8 - doctorInfo.times.length

   const handleAddInterval = () => {
      if (intervalValues.length < availableSlots) {
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

   const checkOverlap = (intervals) => {
      const existingIntervals = intervals.map((interval) => {
         return {
            newStartTimeHour: interval.newStartTimeHour,
            newStartTimeMinute: interval.newStartTimeMinute,
            newEndTimeHour: interval.newEndTimeHour,
            newEndTimeMinute: interval.newEndTimeMinute,
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
               if (i !== j) {
                  const intervalB = existingIntervals[j]

                  if (
                     intervalB.newStartTimeHour !== undefined &&
                     intervalB.newStartTimeMinute !== undefined &&
                     intervalB.newEndTimeHour !== undefined &&
                     intervalB.newEndTimeMinute !== undefined
                  ) {
                     const startTimeB = new Date(
                        `2000-01-01T${intervalB.newStartTimeHour}:${intervalB.newStartTimeMinute}`
                     )
                     const endTimeB = new Date(
                        `2000-01-01T${intervalB.newEndTimeHour}:${intervalB.newEndTimeMinute}`
                     )

                     if (!(endTimeA <= startTimeB || startTimeA >= endTimeB)) {
                        return true
                     }
                  }
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

      dispatch(addTimesheets({ formattedIntervals, doctorInfo }))
         .then(() => {
            handleUpdate()
            // notify('Успешно сохранено')
         })
         .catch(() => {
            notify('Ошибка при сохранении')
         })
   }

   return (
      <Modal open={open} onClose={handleClose} padding="35px 45px">
         <StyledForm>
            <CloseIcon className="closeIcon" onClick={handleClose} />
            <h2>Установить шаблон</h2>
            <div className="container">
               <h6>График:</h6>
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
            </div>
            <div
               className="add-interval"
               onClick={handleAddInterval}
               onKeyDown={handleAddInterval}
               role="presentation"
            >
               <GreenPlus />
               <h4>Добавить интервал</h4>
            </div>
            <div className="buttons">
               <Button variant="normal" onClick={handleClose}>
                  ОТМЕНИТЬ
               </Button>
               <Button onClick={handleSave}>СОХРАНИТЬ</Button>
            </div>
         </StyledForm>
      </Modal>
   )
}

export default AddTemplate

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
      gap: '14px',
      marginTop: '5%',
      h6: {
         color: '#464444',
         fontFamily: 'Manrope',
         fontSize: '1rem',
         fontWeight: '500',
         marginRight: '1rem',
         marginTop: '8px',
      },
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
      marginLeft: '18%',
      width: '40%',
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
