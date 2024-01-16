import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FormLabel } from '@mui/material'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { PulseLoader } from 'react-spinners'
import Modal from '../../components/UI/Modal'
import { Input } from '../../components/UI/input/Input'
import Button from '../../components/UI/Button'
import { forgotPassword } from '../../store/auth/authThunk'
import { localStorageKeys } from '../../utils/constants/constants'

const ForgotPassword = ({ open, setOpen, navigateToSignIn }) => {
   const { isLoading } = useSelector((state) => state.authorization)

   const dispatch = useDispatch()

   const handleClose = () => {
      setOpen(false)
      localStorage.removeItem(localStorageKeys.FORGOT_PASSWORD_MODAL_KEY)
   }

   const {
      register,
      formState: { errors },
      getValues,
      handleSubmit,
   } = useForm({
      mode: 'all',
      defaultValues: {
         email: '',
      },
   })

   const ipAddress = window.location.hostname

   const handleEmailSubmit = () => {
      const values = getValues().email
      const link = `http://${ipAddress}:3000/change-password`
      const email = values
      dispatch(
         forgotPassword({
            email,
            link,
            handleClose,
         })
      )
   }

   useEffect(() => {
      const parsedData = JSON.parse(
         localStorage.getItem(localStorageKeys.FORGOT_PASSWORD_MODAL_KEY)
      )
      setOpen(parsedData)
   }, [])

   return (
      <Modal open={open} onClose={handleClose} borderRadius="5px">
         <FormControlStyled onSubmit={handleSubmit(handleEmailSubmit)}>
            <FormLabel className="topic">забыли пароль?</FormLabel>
            {/* <CloseIcon className="closeIcon" onClick={handleClose} /> */}
            <div>
               <p>Вам будет отправлена ссылка для сброса пароля</p>
               <Input
                  placeholder="Введите ваш Email"
                  error={errors.email}
                  {...register('email', {
                     setValueAs: (v) => v.trim(),
                     required: 'Поле не заполнено',
                     pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Неверный формат электронной почты',
                     },
                  })}
               />
               {errors.email && (
                  <p className="message">{errors.email?.message}</p>
               )}
            </div>

            <Button className="buttonStyle" type="submit" disabled={isLoading}>
               {isLoading ? <PulseLoader /> : 'ОТПРАВИТЬ'}
            </Button>
            <Button className="password" onClick={navigateToSignIn}>
               ОТМЕНИТЬ
            </Button>
         </FormControlStyled>
      </Modal>
   )
}

export default ForgotPassword

const FormControlStyled = styled('form')(() => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'center',
   gap: '1.5rem',
   padding: '2rem 1.5rem',
   borderRadius: '2px',
   background: '#FFFFFF',
   '& input:-internal-autofill-selected': {
      height: '1rem',
   },
   '& .MuiOutlinedInput-input': {
      height: '1rem',
   },
   '& .topic': {
      fontFamily: 'Manrope',
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: '1.563rem',
      color: '#222222',
      textTransform: 'uppercase',
   },
   '& p': {
      color: '#959595',
      fontSize: '1rem',
      marginBottom: '1rem',
      marginLeft: '2px',
   },
   '& .closeIcon': {
      cursor: 'pointer',
      position: 'absolute',
      top: '1rem',
      right: '1.5rem',
   },
   '& .buttonStyle': {
      height: '3rem',
      width: '26rem',
      borderRadius: '0.625rem',
      fontSize: '0.875rem',
   },
   '& .password': {
      height: '2.5rem',
      width: '26rem',
      fontFamily: 'Manrope',
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: '1rem',
      color: '#959595',
      textDecoration: 'none',
      background: 'none',
      '&:hover': {
         background: 'none',
      },
   },
   '& .message': {
      color: 'red',
      fontSize: '0.8rem',
      position: 'absolute',
   },
}))
