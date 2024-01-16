import { useEffect, useState } from 'react'
import { styled } from '@mui/material'
import { useDispatch } from 'react-redux'
import Drawer from '../UI/Drawer'
import ChooseDate from './ChooseDate'
import AppointmentForm from './AppointmentForm'
import Registered from './Registered'
import MainOnlineAppointment from './MainOnlineAppointment'
import { CloseIcon, GoBackIcon } from '../../assets'
import ChooseSpecialists from './СhooseSpecialists'
import { localStorageKeys } from '../../utils/constants/constants'
import ChooseSpecialistTime from './ChooseSpecialistTime'
import {
   getAllDoctors,
   getDoctorsTimesheets,
} from '../../store/appointment/appointmentThunk'
import { MED_SERVICE } from '../../utils/services/med_service'
import { notify } from '../../utils/constants/snackbar'
import { clearError } from '../../store/appointment/appointmentSlice'

const OnlineAppointment = ({ open, setOpen }) => {
   const [mainPage, setMainPage] = useState(true)
   const [specialistTimePage, setSpecialistTimePage] = useState(false)
   const [specialistPage, setSpecialistPage] = useState(false)
   const [datePage, setDatePage] = useState(false)
   const [formPage, setFormPage] = useState(false)
   const [registeredPage, setRegisteredPage] = useState(false)
   const [selectedDoctorId, setSelectedDoctorId] = useState(null)

   const [service, setService] = useState('')
   const [selectedService, setSelectedService] = useState('')
   const [specialist, setSpecialist] = useState('')
   const [date, setDate] = useState('')

   const dispatch = useDispatch()

   useEffect(() => {
      const parsedData = JSON.parse(
         localStorage.getItem(localStorageKeys.DRAWER_MODAL_KEY)
      )
      setOpen(parsedData)
   }, [])

   const validate = !service || !specialist || !date

   const serviceChangeHandler = (e) => {
      const updatedDate = date || ''
      const selectedService = e.target.value
      setService(selectedService)
      setDate(updatedDate)
      const selectedServiceObject = MED_SERVICE.find(
         (service) => service.id === selectedService
      )
      setSelectedService(selectedServiceObject.title)
      if (selectedServiceObject) {
         const departmentId = selectedServiceObject.id
         dispatch(getAllDoctors({ departmentId }))
      } else {
         notify('Выберите услугу', 'error')
      }
   }

   const openChooseSpecialist = () => {
      if (service) {
         setMainPage(false)
         setSpecialistPage(true)
      } else {
         notify('Для начала выберите услугу', 'error')
      }
   }
   const openChooseSpecialistTime = ({ id }) => {
      setSpecialistPage(false)
      dispatch(getDoctorsTimesheets({ doctorId: id }))
      setSpecialistTimePage(true)
      setSelectedDoctorId(id)
   }

   const openDate = () => {
      if (service && specialist) {
         setMainPage(false)
         setDatePage(true)
      } else {
         notify('Для начала выберите специалиста', 'error')
      }
   }

   const openForm = () => {
      setMainPage(false)
      setFormPage(true)
   }

   const openRegistered = () => {
      setFormPage(false)
      setRegisteredPage(true)
   }

   const goBack = () => {
      setSpecialistPage(false)
      setSpecialistTimePage(false)
      setDatePage(false)
      setFormPage(false)
      setRegisteredPage(false)
      setMainPage(true)
   }

   const goBackAndClear = () => {
      setSpecialistPage(false)
      setSpecialistTimePage(false)
      setDatePage(false)
      setFormPage(false)
      setRegisteredPage(false)
      setMainPage(true)
      setService('')
      setSpecialist('')
      setDate('')
   }

   const goBackInSpecialists = () => {
      setSpecialistTimePage(false)
      setSpecialistPage(true)
      dispatch(clearError())
   }

   const dateChangeHandler = (date) => {
      setDate(date)
      goBack()
   }

   const chooseSpecialist = (specialist) => {
      setSpecialist(specialist)
      goBack()
   }

   const handleClose = () => {
      setOpen(false)
      localStorage.removeItem(localStorageKeys.DRAWER_MODAL_KEY)
   }

   return (
      <Drawer open={open} onClose={handleClose}>
         <Container>
            {mainPage ? (
               <Close onClick={handleClose} />
            ) : (
               <GoBack
                  onClick={specialistTimePage ? goBackInSpecialists : goBack}
               />
            )}
            <Header>
               <Title>
                  {mainPage && 'Онлайн Запись'}
                  {specialistPage && 'Выбрать специалиста'}
                  {specialistTimePage && 'Выбрать дату и время'}
                  {datePage && 'Выбрать дату и время'}
                  {formPage && 'Запись'}
                  {registeredPage && 'Онлайн Запись'}
               </Title>
            </Header>
            {mainPage && (
               <MainOnlineAppointment
                  onClose={handleClose}
                  openChooseSpecialist={openChooseSpecialist}
                  openDate={openDate}
                  openForm={openForm}
                  service={service}
                  specialist={specialist}
                  date={date}
                  serviceChangeHandler={serviceChangeHandler}
                  validate={validate}
               />
            )}
            {specialistPage && (
               <ChooseSpecialists
                  chooseSpecialist={chooseSpecialist}
                  openChooseSpecialistTime={openChooseSpecialistTime}
               />
            )}
            {specialistTimePage && (
               <ChooseSpecialistTime
                  chooseSpecialist={chooseSpecialist}
                  dateChangeHandler={dateChangeHandler}
               />
            )}
            {datePage && <ChooseDate dateChangeHandler={dateChangeHandler} />}
            {formPage && (
               <AppointmentForm
                  service={selectedService}
                  specialist={specialist}
                  date={date}
                  openRegistered={openRegistered}
                  selectedDoctorId={selectedDoctorId}
               />
            )}
            {registeredPage && <Registered goBack={goBackAndClear} />}
         </Container>
      </Drawer>
   )
}

export default OnlineAppointment

const Container = styled('div')(() => ({
   '&': {
      background: ' #F3F1F1',
      height: '100vh',
   },
}))

const Header = styled('div')(() => ({
   background: '#fff',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
}))

const Close = styled(CloseIcon)(() => ({
   cursor: 'pointer',
   position: 'absolute',
   top: '16px',
   left: '16px',
}))
const GoBack = styled(GoBackIcon)(() => ({
   cursor: 'pointer',
   position: 'absolute',
   top: '16px',
   left: '16px',
}))

const Title = styled('h4')(() => ({
   margin: '17px auto',
   fontFamily: 'Manrope',
   fontStyle: 'normal',
   fontWeight: '700',
   fontSize: '16px',
   color: '#048741',
}))
