import { styled } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import Button from '../UI/Button'
import { cancelAppointment } from '../../store/appointment/appointmentThunk'
import { Close } from '../../assets'

const ConfirmModal = ({ handleClose, appointmentData, goBack }) => {
   const [cancelSuccess, setCancelSuccess] = useState(false)

   const dispatch = useDispatch()

   const handleCancel = () => {
      dispatch(
         cancelAppointment({ appointmentId: appointmentData.appointmentId })
      ).then(() => {
         setCancelSuccess(true)
      })
   }

   return (
      <Container>
         {cancelSuccess ? (
            <ModalContent>
               <div className="closeContainer">
                  <Close onClick={goBack} />
               </div>
               <p>Запись отменена</p>
               <Button onClick={goBack}>Записаться еще</Button>
            </ModalContent>
         ) : (
            <ModalContent>
               <h3>Отмена записи</h3>
               <hr />
               <p>После отмены запись будет невозможно восстановить</p>
               <div>
                  <Button
                     variant="outlined"
                     className="calceledButton"
                     onClick={handleCancel}
                  >
                     Отменить запись
                  </Button>
                  <Button onClick={handleClose}>Закрыть</Button>
               </div>
            </ModalContent>
         )}
      </Container>
   )
}

const Container = styled('div')(() => ({
   position: 'fixed',
   top: 0,
   right: 0,
   width: '24.75%',
   height: '100vh',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: 'rgba(0, 0, 0, 0.3)',
   transition: 'background-color 0.3s ease',
   padding: '0 2rem',
}))

const ModalContent = styled('div')(() => ({
   width: '100%',
   position: 'relative',
   display: 'flex',
   flexDirection: 'column',
   backgroundColor: '#fff',
   padding: '20px',
   borderRadius: '1rem',
   textAlign: 'center',
   marginBottom: '44%',
   '.closeContainer': {
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: '40%',
      width: '3rem',
      height: '3rem',
      borderRadius: '50%',
      border: '3px solid #959595',
      svg: {
         cursor: 'pointer',
      },
   },
   button: {
      width: '100%',
   },
   h3: {
      fontWeight: '500',
      fontSize: '1.1rem',
   },
   p: {
      margin: '1.8rem 0',
   },
   hr: {
      position: 'absolute',
      top: '22%',
      left: '0',
      border: 'none',
      height: '1px',
      width: '100%',
      backgroundColor: '#F3F1F1',
   },
   div: {
      '.calceledButton': {
         height: '2.7rem',
      },
      display: 'flex',
      flexDirection: 'column',
      gap: '0.8rem',
   },
}))

export default ConfirmModal
