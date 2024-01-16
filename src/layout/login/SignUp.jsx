import React, { useEffect, useState } from 'react'
import { FormLabel, IconButton, InputAdornment } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { signInWithPopup } from 'firebase/auth'
import { PulseLoader } from 'react-spinners'
import { GoogleIcon, Show, ShowOff } from '../../assets'
import Modal from '../../components/UI/Modal'
import Button from '../../components/UI/Button'
import { Input } from '../../components/UI/input/Input'
import { authWithGoogle, signUp } from '../../store/auth/authThunk'
import { notify } from '../../utils/constants/snackbar'
import { auth, provider } from '../../store/auth/firebase'
import { localStorageKeys } from '../../utils/constants/constants'

const SignUp = ({ open, setOpen, navigateToSignIn }) => {
   const [showPassword, setShowPassword] = useState(false)
   const [showPasswordCopy, setShowPasswordCopy] = useState(false)

   const { isLoading } = useSelector((state) => state.authorization)

   const navigate = useNavigate()
   const dispatch = useDispatch()

   const {
      register,
      formState: { errors },
      watch,
      getValues,
      handleSubmit,
   } = useForm({
      mode: 'all',
      defaultValues: {
         firstName: '',
         lastName: '',
         phoneNumber: '',
         email: '',
         password: '',
         copyPassword: '',
      },
   })

   const watchPassword = watch('password', '')

   const handleClose = () => {
      setOpen(false)
      localStorage.removeItem(localStorageKeys.SIGN_UP_MODAL_KEY)
   }

   const handleRegister = () => {
      const values = getValues()
      if (values.password === values.copyPassword) {
         dispatch(
            signUp({
               values,
               handleClose,
               navigate,
            })
         )
         values.firstName = ''
         values.lastName = ''
         values.email = ''
         values.phoneNumber = ''
         values.password = ''
      } else {
         notify('Пароли не совпадают', 'error')
      }
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
   }

   const handleKeyPress = (e) => {
      const keys = e.key
      if (!/^\d$/.test(keys) && keys !== '+') {
         e.preventDefault()
      }
   }

   useEffect(() => {
      const parsedData = JSON.parse(
         localStorage.getItem(localStorageKeys.SIGN_UP_MODAL_KEY)
      )
      setOpen(parsedData)
   }, [])

   const showPasswordHandle = () => {
      setShowPassword(!showPassword)
   }
   const clickHandle = (e) => {
      e.preventDefault()
   }
   const showPasswordHandler = () => {
      setShowPasswordCopy(!showPasswordCopy)
   }
   const clickHandler = (e) => {
      e.preventDefault()
   }

   return (
      <Modal open={open} onClose={handleClose} borderRadius="5px">
         <FormControlStyled onSubmit={handleSubmit(handleRegister)}>
            <FormLabel className="topic">РЕГИСТРАЦИЯ</FormLabel>
            {/* <CloseIcon className="closeIcon" onClick={handleClose} /> */}
            <div className="inputContainer">
               <div className="inputWrapper">
                  <Input
                     placeholder="Имя"
                     error={errors.firstName}
                     {...register('firstName', {
                        setValueAs: (v) => v.trim(),
                        required: 'Поле не заполнено',
                     })}
                  />
                  {errors.firstName && (
                     <p className="message">{errors.firstName?.message}</p>
                  )}
               </div>
               <div className="inputWrapper">
                  <Input
                     placeholder="Фамилия"
                     error={errors.lastName}
                     {...register('lastName', {
                        setValueAs: (v) => v.trim(),
                        required: 'Поле не заполнено',
                     })}
                  />
                  {errors.lastName && (
                     <p className="message">{errors.lastName?.message}</p>
                  )}
               </div>
               <div className="inputWrapper">
                  <Input
                     placeholder="+996 (_ _ _) _ _  _ _  _ _ "
                     error={errors.phoneNumber}
                     type="text"
                     onKeyPress={handleKeyPress}
                     {...register('phoneNumber', {
                        setValueAs: (v) => v.trim(),
                        required: 'Поле не заполнено',
                        minLength: {
                           value: 13,
                           message: 'Номер телефона слишком короткий',
                        },
                        maxLength: {
                           value: 13,
                           message: 'Номер телефона слишком длинный',
                        },
                     })}
                  />
                  {errors.phoneNumber && (
                     <p className="message">{errors.phoneNumber?.message}</p>
                  )}
               </div>
               <div className="inputWrapper">
                  <Input
                     placeholder="Email"
                     error={errors.email}
                     {...register('email', {
                        required: 'Поле не заполнено',
                        setValueAs: (v) => v.trim(),
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
               <div className="inputWrapper">
                  <Input
                     placeholder="Введите пароль"
                     error={errors.password}
                     {...register('password', {
                        setValueAs: (v) => v.trim(),
                        required: 'Поле не заполнено',
                        minLength: {
                           value: 8,
                           message:
                              'Пароль должен содержать не менее 8 символов',
                        },
                     })}
                     type={showPassword ? 'text' : 'password'}
                     InputProps={{
                        endAdornment: (
                           <InputAdornment position="end">
                              <IconButton
                                 onClick={showPasswordHandle}
                                 onMouseDown={clickHandle}
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
               <div className="inputWrapper">
                  <Input
                     placeholder="Повторите пароль"
                     error={errors.password}
                     {...register('copyPassword', {
                        setValueAs: (v) => v.trim(),
                        required: 'Поле не заполнено',
                        validate: (value) =>
                           value === watchPassword || 'Пароли не совпадают',
                     })}
                     type={showPasswordCopy ? 'text' : 'password'}
                     InputProps={{
                        endAdornment: (
                           <InputAdornment position="end">
                              <IconButton
                                 onClick={showPasswordHandler}
                                 onMouseDown={clickHandler}
                              >
                                 {showPassword ? <ShowOff /> : <Show />}
                              </IconButton>
                           </InputAdornment>
                        ),
                     }}
                  />
                  {errors.copyPassword && (
                     <p className="message">{errors.copyPassword?.message}</p>
                  )}
               </div>
            </div>
            <Button className="buttonStyle" type="submit" disabled={isLoading}>
               {isLoading ? <PulseLoader /> : 'СОЗДАТЬ АККАУНТ'}
            </Button>
            <Line className="Line">
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
                  Зарегистрироваться с Google
               </NavLink>
            </Button>
            <div className="register">
               <span>У вас уже есть аккаунт?</span>
               <Link to="/" onClick={navigateToSignIn}>
                  Войти
               </Link>
            </div>
         </FormControlStyled>
      </Modal>
   )
}

export default SignUp

const FormControlStyled = styled('form')(() => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'center',
   gap: '1.5rem',
   background: '#FFFFFF',
   padding: '0.5rem 1.5rem',
   '& input:-internal-autofill-selected': {
      height: '1rem',
   },
   '& .MuiOutlinedInput-input': {
      height: '1rem',
   },
   '& .inputContainer': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1.5rem',
      '& input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button':
         {
            '-webkit-appearance': 'none',
         },
   },
   '& .topic': {
      fontFamily: 'Manrope',
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: '1.563rem',
      color: '#222222',
   },
   '& .closeIcon': {
      cursor: 'pointer',
      position: 'absolute',
      top: '1rem',
      right: '1.5rem',
   },
   '& .buttonStyle': {
      width: '100%',
      padding: '0.7rem 0',
   },
   '& .buttonGoogle': {
      height: '2.438rem',
      width: '26rem',
      fontFamily: 'Manrope',
      fontSize: '1rem',
      fontWeight: 600,
      borderRadius: '0.5rem',
      lineHeight: '1rem',
      color: '#222222',
      background: '#F5F5F5',
      textTransform: 'none',
      '&:hover': {
         background: '#efeded',
      },
   },
   '& .register': {
      color: '#3772FF',
      fontFamily: 'Manrope',
      fontSize: '0.875rem',
      fontWeight: 400,
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
   '& .inputWrapper': {
      position: 'relative',
   },
}))

const Line = styled('div')(() => ({
   display: 'flex',
   gap: '1rem',
   '& .lineFirst': {
      width: '10.313rem',
      height: '0rem',
      margin: '0.5rem 0',
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
