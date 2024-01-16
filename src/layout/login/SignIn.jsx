import React, { useEffect, useState } from 'react'
import { FormLabel, IconButton, InputAdornment } from '@mui/material'
import styled from '@emotion/styled'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { signInWithPopup } from 'firebase/auth'
import { PulseLoader } from 'react-spinners'
import Modal from '../../components/UI/Modal'
import { Input } from '../../components/UI/input/Input'
import Button from '../../components/UI/Button'
import { authWithGoogle, signIn } from '../../store/auth/authThunk'
import { auth, provider } from '../../store/auth/firebase'
import { notify } from '../../utils/constants/snackbar'
import { localStorageKeys } from '../../utils/constants/constants'
import { GoogleIcon, Show, ShowOff } from '../../assets'

const SignIn = ({
   open,
   setOpen,
   navigateToForgotPassword,
   navigateToSignUp,
}) => {
   const [showPassword, setShowPassword] = useState(false)

   const { isLoading } = useSelector((state) => state.authorization)

   const navigate = useNavigate()
   const dispatch = useDispatch()

   const {
      register,
      formState: { errors },
      getValues,
      handleSubmit,
   } = useForm({
      mode: 'all',
      defaultValues: {
         email: '',
         password: '',
      },
   })

   const handleClose = () => {
      setOpen(false)
      localStorage.removeItem(localStorageKeys.SIGN_IN_MODAL_KEY)
   }

   const handleSignIn = () => {
      const values = getValues()
      dispatch(
         signIn({
            values,
            handleClose,
            navigate,
         })
      )
      values.email = ''
      values.password = ''
   }

   const handleAuthWithGoogle = () => {
      signInWithPopup(auth, provider)
         .then((data) => {
            const userToken = data.user.accessToken
            return userToken
         })
         .then((token) => {
            dispatch(authWithGoogle({ token, navigate }))
            handleClose()
         })
         .catch((error) => {
            if (error.code === 'auth/cancelled-popup-request') {
               notify('Вы отменили запрос на всплывающее окно', 'error')
            } else {
               notify('Произошла ошибка при аутентификации с Google', 'error')
            }
         })
   }

   useEffect(() => {
      const parsedData = JSON.parse(
         localStorage.getItem(localStorageKeys.SIGN_IN_MODAL_KEY)
      )
      setOpen(parsedData)
   }, [])

   const showPasswordHandle = () => {
      setShowPassword(!showPassword)
   }

   const clickHanlder = (e) => {
      e.preventDefault()
   }

   return (
      <Modal open={open} onClose={handleClose} borderRadius="5px">
         <FormControlStyled onSubmit={handleSubmit(handleSignIn)}>
            <div>
               <FormLabel className="topic">ВОЙТИ</FormLabel>
               {/* <CloseIcon className="closeIcon" onClick={handleClose} /> */}
            </div>
            <div>
               <Input
                  placeholder="Логин"
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
            <div>
               <Input
                  placeholder="Пароль"
                  error={errors.password}
                  {...register('password', {
                     setValueAs: (v) => v.trim(),
                     required: 'Поле не заполнено',
                     minLength: {
                        value: 8,
                        message: 'Пароль должен содержать не менее 8 символов',
                     },
                  })}
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                     endAdornment: (
                        <InputAdornment position="end">
                           <IconButton
                              onClick={showPasswordHandle}
                              onMouseDown={clickHanlder}
                           >
                              {showPassword ? <ShowOff /> : <Show />}
                           </IconButton>
                        </InputAdornment>
                     ),
                  }}
               />

               {errors.password && (
                  <p className="message">{errors.password?.message}</p>
               )}
            </div>
            <Button className="buttonStyle" type="submit" disabled={isLoading}>
               {isLoading ? <PulseLoader /> : 'ВОЙТИ'}
            </Button>
            <NavLink
               className="password"
               to="/"
               onClick={navigateToForgotPassword}
            >
               Забыли пароль ?
            </NavLink>
            <Line>
               <hr className="lineFirst" />
               <span>или</span>
               <hr className="lineSecond" />
            </Line>
            <Button
               className="buttonGoogle"
               startIcon={<GoogleIcon />}
               onClick={handleAuthWithGoogle}
            >
               <NavLink to="/" className="google">
                  Продолжить с Google
               </NavLink>
            </Button>
            <div className="register">
               <span>Нет аккаунта? </span>
               <Link to="/" onClick={navigateToSignUp}>
                  Зарегистрироваться
               </Link>
            </div>
         </FormControlStyled>
      </Modal>
   )
}

export default SignIn

const FormControlStyled = styled('form')(() => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'center',
   gap: '1.6rem',
   padding: '2rem 1.5rem',
   background: '#FFFFFF',
   '& input:-internal-autofill-selected': {
      height: '1rem',
   },
   '& .MuiOutlinedInput-input': {
      height: '1rem',
   },
   '& .topic': {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: '1.563rem',
      color: '#222222',
      fontFamily: 'Manrope',
   },
   '& .closeIcon': {
      cursor: 'pointer',
      position: 'absolute',
      top: '1rem',
      right: '1.5rem',
   },
   '& .buttonGoogle': {
      height: '2.438rem',
      width: '25.5rem',
      fontFamily: 'Manrope',
      fontSize: '1rem',
      fontWeight: 600,
      borderRadius: ' 0.5rem',
      lineHeight: '1rem',
      color: '#222222',
      background: '#F5F5F5',
      textTransform: 'none',
      '&:hover': {
         background: '#efeded',
      },
   },
   '& .password': {
      fontSize: '1rem',
      fontWeight: 400,
      fontFamily: 'Manrope',
      lineHeight: '1rem',
      color: '#346EFB',
      textDecoration: 'none',
   },
   '& .register': {
      textDecoration: 'none',
      color: '#3772FF',
      fontWeight: 400,
      fontSize: '0.875rem',
      '& span': {
         color: '#222222',
      },
      '& a': {
         textDecoration: 'none',
         color: '#346EFB',
      },
   },
   '& .google': {
      textDecoration: 'none',
      color: '#222222',
   },
   '& .message': {
      color: 'red',
      fontSize: '0.8rem',
      position: 'absolute',
   },
   '& .buttonStyle': {
      width: '100%',
   },
}))

const Line = styled('div')(() => ({
   display: 'flex',
   gap: '1rem',
   '& .lineFirst': {
      width: '10.313rem',
      margin: '0.5rem 0',
      height: '0rem',
      color: '#F3F1F1',
   },
   '& span': {
      fontFamily: 'Manrope',
      fontWeight: '500',
      textTransform: 'uppercase',
      fontSize: '0.75rem',
      color: '#222222',
   },
   '& .lineSecond': {
      width: '10.313rem',
      color: '#F3F1F1',
      margin: '0.5rem 0',
      height: '0rem',
   },
}))
