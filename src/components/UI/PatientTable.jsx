import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Button } from '@mui/material'
import styled from '@emotion/styled'
import { fetchAppointmentById } from '../../store/myappointments/myappointmentsThunk'

const PatientTable = () => {
   const { appointmentId } = useParams()
   const { status, selectedAppointment } = useSelector(
      (state) => state.myappointments
   )

   const dispatch = useDispatch()

   useEffect(() => {
      if (status === 'idle') {
         console.log(appointmentId, 'error')
         dispatch(fetchAppointmentById(appointmentId))
      }
   }, [dispatch, appointmentId, status])

   if (status === 'failed') {
      return <StyledError />
   }

   return (
      <DivStyled>
         <div>
            <h2>Мои записи</h2>
            <p>Статус</p>
            <Button className="ButtonStyled" type="submit">
               Подтверждён
            </Button>
         </div>

         <div className="box">
            <ul>
               <ul className="child">
                  <li>Имя</li>
                  <li>{selectedAppointment.firstName}</li>
               </ul>

               <ul className="child">
                  <li>Фамилия</li>
                  <li>{selectedAppointment.lastName}</li>
               </ul>

               <ul className="child">
                  <li>Email</li>
                  <li>{selectedAppointment.email}</li>
               </ul>
               <ul className="child">
                  <li>Номер телефона</li>
                  <li>{selectedAppointment.phoneNumber}</li>
               </ul>
            </ul>

            <ul className="boxtwo">
               <ul className="child">
                  <li>Дата и время</li>
                  <li>{selectedAppointment.localDate}</li>
                  <li>{selectedAppointment.time}</li>
               </ul>

               <ul className="child">
                  <li>Специалист</li>
                  <li>{selectedAppointment.doctorFullName}</li>
               </ul>
               <ul className="child">
                  <li>Услуга</li>
                  <li>{selectedAppointment.departmentName}</li>
               </ul>
            </ul>
         </div>
      </DivStyled>
   )
}
export default PatientTable

const DivStyled = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   marginTop: '4.688rem',
   marginLeft: '6rem',
   textAlign: 'start',

   '& div': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      '&h2': {
         fontWeight: '37.5rem',
         marginTop: '2.5rem',
         fontSize: '1.5rem',
      },
      '& p': {
         marginTop: '2.5rem',
         fontSize: '1rem',
         fontFamily: 'Manrope',
      },

      '& Button': {
         height: '2rem',
         width: '7rem',
         borderRadius: '0.625rem',
         fontSize: '0.675rem',
         marginTop: '0.50rem',
         fontFamily: 'Manrope',
         background: '#346EFB',
      },
      '& Button.canceled': {
         background: 'red',
      },
      '& Button.prohibited': {
         background: 'blue',
      },
      '& Button.confirmed': {
         background: 'green',
      },
   },

   '.box': {
      width: '12.5rem',
      height: '19.5rem',
      display: 'flex',
      flexDirection: 'row',
      gap: '0.5rem',
      marginTop: '0.75rem',
      borderRadius: '4px',
      color: '#222222',
      fontFamily: 'Manrope',
   },

   '.boxtwo': {
      marginLeft: '5rem',
   },
   '.child': {
      width: '18.063rem',
      fontFamily: 'Manrope',
      marginTop: '0.6rem',
      listStyle: 'none',
   },
}))

const StyledError = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   minHeight: '200px',
   width: '800px',
   '& > div': {
      textAlign: 'center',
      borderRadius: 20,
      padding: '20px',
      border: '1px solid gray',
      backgroundColor: '#cfcaca',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      maxWidth: '500px',
      width: '100%',
   },
   '& > p': {
      color: 'gray',
      fontSize: '18px',
      fontWeight: 'bold',
   },
}))
