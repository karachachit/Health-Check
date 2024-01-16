import React from 'react'
import { styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import { format } from 'date-fns'
import Modal from '../../components/UI/Modal'
import { SelectUI } from '../../components/UI/Select'
import DatePicker from '../../components/UI/DatePicker'
import TimePicker from '../../components/UI/TimePicker'
import {
   DEPARTMENTS,
   INTERVAL_IN_MINUTES,
   MED_SERVICE,
   TRANSLATED_MED_SERVICES_ENG,
} from '../../utils/services/med_service'
import {
   getAllDoctors,
   postNewAppointmentsThunk,
} from '../../store/appointments/adminAppointmentsThunk'
import Button from '../../components/UI/Button'
import { notify } from '../../utils/constants/snackbar'
import { DAYS, RUSSIAN_DAYS } from '../../utils/constants/commons'

export const ModalAppointments = ({ open, onClose, setIsModalOpen }) => {
   const { doctors } = useSelector((state) => state.appointmentsAdmin)
   const dispatch = useDispatch()

   const { getValues, setValue, control, watch, reset, handleSubmit } = useForm(
      {
         mode: 'all',
         defaultValues: {
            departmentName: '',
            doctorId: 0,
            startDateOfWork: '00:00',
            endDateOfWork: '00:00',
            startTimeOfWork: '00:00',
            endTimeOfWork: '00:00',
            startBreakTime: '00:00',
            endBreakTime: '00:00',
            intervalInMinutes: 0,
            dayOfWeek: {},
         },
      }
   )

   const dateToday = dayjs()

   const startDate = watch('startDateOfWork')

   const handleStartDateChange = (date) => {
      setValue('startDateOfWork', date)
   }

   const serviceChangeHandler = (e) => {
      const selectedService = e
      const selectedServiceObject = MED_SERVICE.find(
         (service) => service.id === selectedService
      )
      if (selectedServiceObject) {
         const departmentId = selectedServiceObject.id
         dispatch(getAllDoctors({ departmentId }))
      } else {
         notify('Выберите услугу', 'error')
      }
   }

   const handleDayButtonClick = (dayId) => {
      const dayLabel = DAYS[dayId].label
      const isActive = !getValues(`dayOfWeek.${dayLabel}`)

      setValue(`dayOfWeek.${dayLabel}`, isActive)
   }

   const handleFormSubmit = () => {
      const values = getValues()
      const errors = []
      if (!values.departmentName) {
         errors.push('Пожалуйста, укажите название отдела!')
      }
      if (!values.doctorId) {
         errors.push('Пожалуйста, выберите врача!')
      }
      const selectedInterval = INTERVAL_IN_MINUTES.find(
         (interval) => interval.id === values.intervalInMinutes
      )
      if (!selectedInterval) {
         errors.push('Интервал времени должен быть 30, 45, 60 или 90 минут!')
      }
      if (errors.length > 0) {
         notify(errors[0], 'error')
      } else {
         values.startDateOfWork = format(
            new Date(values.startDateOfWork),
            'yyyy-MM-dd'
         )
         values.endDateOfWork = format(
            new Date(values.endDateOfWork),
            'yyyy-MM-dd'
         )
         values.startTimeOfWork = format(
            new Date(values.startTimeOfWork),
            'HH:mm'
         )
         values.endTimeOfWork = format(new Date(values.endTimeOfWork), 'HH:mm')
         values.startBreakTime = format(
            new Date(values.startBreakTime),
            'HH:mm'
         )
         values.endBreakTime = format(new Date(values.endBreakTime), 'HH:mm')
         dispatch(
            postNewAppointmentsThunk({
               ...values,
               intervalInMinutes: selectedInterval.time,
               departmentName:
                  TRANSLATED_MED_SERVICES_ENG[
                     DEPARTMENTS.find(
                        (department) => department.id === values.departmentName
                     ).title
                  ],
            })
         )
         setIsModalOpen(false)
         reset()
      }
   }
   return (
      <Modal open={open} onClose={onClose}>
         <form onSubmit={handleSubmit(handleFormSubmit)}>
            <StyleModalContainer>
               <h2>Добавление записей</h2>
               <div className="blockAdd-app">
                  <Controller
                     control={control}
                     name="departmentName"
                     defaultValue={null}
                     render={({ field }) => (
                        <SelectUI
                           className="custom-select"
                           label="Услуга"
                           placeholder="Выберите услугу"
                           options={DEPARTMENTS}
                           {...field}
                           selected={field.value}
                           onChange={(e) => {
                              field.onChange(e)
                              serviceChangeHandler(e)
                           }}
                        />
                     )}
                  />
                  <Controller
                     control={control}
                     name="doctorId"
                     defaultValue={null}
                     render={({ field }) => (
                        <SelectUI
                           variant="doctors"
                           className="custom-select"
                           label="Специалист"
                           placeholder="Выберите специалиста"
                           options={doctors}
                           {...field}
                           selected={field.value}
                           onChange={(date) => field.onChange(date)}
                        />
                     )}
                  />
                  <div className="block-inputs">
                     <div>
                        <label htmlFor="start-date">Дата начала</label>
                        <Controller
                           control={control}
                           name="startDateOfWork"
                           defaultValue={null}
                           render={({ field }) => (
                              <DatePicker
                                 {...field}
                                 selected={field.value}
                                 onChange={(date) => {
                                    field.onChange(date)
                                    handleStartDateChange(date)
                                 }}
                                 variant="custom"
                                 minDate={dateToday}
                              />
                           )}
                        />
                     </div>
                     <span>-</span>
                     <div>
                        <label htmlFor="end-date">Дата окончания</label>
                        <Controller
                           control={control}
                           name="endDateOfWork"
                           defaultValue={null}
                           render={({ field }) => (
                              <DatePicker
                                 {...field}
                                 selected={field.value}
                                 onChange={(date) => field.onChange(date)}
                                 variant="custom"
                                 minDate={startDate}
                              />
                           )}
                        />
                     </div>
                  </div>
                  <div className="block-inputs">
                     <div>
                        <label htmlFor="time-from-1">Время от</label>
                        <Controller
                           control={control}
                           name="startTimeOfWork"
                           defaultValue={null}
                           render={({ field }) => (
                              <TimePicker
                                 {...field}
                                 selected={field.value}
                                 onChange={(date) => field.onChange(date)}
                              />
                           )}
                        />
                     </div>
                     <span>-</span>
                     <div>
                        <label htmlFor="time-to-1">Время до</label>
                        <Controller
                           control={control}
                           name="endTimeOfWork"
                           defaultValue={null}
                           render={({ field }) => (
                              <TimePicker
                                 {...field}
                                 selected={field.value}
                                 onChange={(date) => field.onChange(date)}
                              />
                           )}
                        />
                     </div>
                     <Controller
                        control={control}
                        name="intervalInMinutes"
                        defaultValue={null}
                        render={({ field }) => (
                           <SelectUI
                              className="custom-select"
                              label="Интервал часов"
                              placeholder="Выберите интервал часов"
                              options={INTERVAL_IN_MINUTES}
                              {...field}
                              selected={field.value}
                              onChange={(e) => {
                                 field.onChange(e)
                              }}
                           />
                        )}
                     />
                  </div>
                  <div className="block-inputs">
                     <div>
                        <label htmlFor="time-from-2">Время от</label>
                        <Controller
                           control={control}
                           name="startBreakTime"
                           defaultValue={null}
                           render={({ field }) => (
                              <TimePicker
                                 {...field}
                                 selected={field.value}
                                 onChange={(date) => field.onChange(date)}
                              />
                           )}
                        />
                     </div>
                     <span>-</span>
                     <div>
                        <label htmlFor="time-to-2">Время до</label>
                        <Controller
                           control={control}
                           name="endBreakTime"
                           defaultValue={null}
                           render={({ field }) => (
                              <TimePicker
                                 {...field}
                                 selected={field.value}
                                 onChange={(date) => field.onChange(date)}
                              />
                           )}
                        />
                     </div>
                     <p>Выберите время для перерыва</p>
                  </div>
                  <div>
                     <label htmlFor="day-buttons-group">Дни повторения</label>
                     <div id="day-buttons-group" className="day-buttons">
                        {DAYS.map((day, index) => (
                           <button
                              key={day.id}
                              onClick={() => handleDayButtonClick(day.id)}
                              type="button"
                              className={
                                 getValues(`dayOfWeek.${day.label}`)
                                    ? 'active'
                                    : ''
                              }
                           >
                              {RUSSIAN_DAYS[index].label}
                           </button>
                        ))}
                     </div>
                  </div>
                  <div className="block-buttons">
                     <Button
                        className="button-result"
                        variant="normal"
                        onClick={() => setIsModalOpen(false)}
                     >
                        ОТМЕНИТЬ
                     </Button>
                     <Button className="button-result" type="submit">
                        ОПУБЛИКОВАТЬ
                     </Button>
                  </div>
               </div>
            </StyleModalContainer>
         </form>
      </Modal>
   )
}

const StyleModalContainer = styled('div')`
   padding: 0% 3vh;
   .blockAdd-app {
      display: flex;
      flex-direction: column;
      justify-content: start;
      gap: 15px;
      margin-top: 20px;
   }
   h2 {
      text-align: center;
      font-size: 24px;
      font-weight: 500;
      color: #222;
   }
   label {
      display: block;
   }
   .custom-select {
      border-radius: 6px !important;
      height: 5.2vh;
      border: 0px solid #d4d4d4;
   }
   .block-inputs {
      display: flex;
      align-items: center;
      gap: 10px;
      span,
      p {
         margin-top: 1rem;
      }
   }
   .day-buttons {
      display: flex;
      gap: 15px;
      margin-bottom: 10px;
      button {
         background-color: #fff;
         padding: 10px 17px 10px 16px;
         justify-content: center;
         align-items: center;
         border-radius: 10px;
         border: 1px solid #d9d9d9;
         font-size: 16px;
         font-weight: 600;
         color: #959595;
         cursor: pointer;
      }
      button.active {
         background-color: #3977c0;
         color: #ffffff;
         border: 0.3px solid #3977c0;
      }
   }
   .block-buttons {
      display: flex;
      justify-content: space-between;
      gap: 15px;
      width: 100%;
      max-width: 100%;
   }
   .button-result {
      width: 17rem;
   }
`
