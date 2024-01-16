import { IconButton, InputAdornment, styled } from '@mui/material'
import { ErrorMessage, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { NavLink } from 'react-router-dom'
import { HideIcon, ShowIcon } from '../../assets'
import Button from '../../components/UI/Button'
import { Input } from '../../components/UI/input/Input'
import { updatePassword } from '../../store/profile/profileThunk'

export const PasswordChange = () => {
   const [showPassword, setShowPassword] = useState(false)
   const [showPasswordCopy, setShowPasswordCopy] = useState(false)
   const [showPasswordEnd, setShowPasswordEnd] = useState(false)
   const dispatch = useDispatch()

   const showPasswordHandle = () => {
      setShowPassword(!showPassword)
   }

   const showPasswordCopyHandler = () => {
      setShowPasswordCopy(!showPasswordCopy)
   }

   const showPasswordEndHandler = () => {
      setShowPasswordEnd(!showPasswordEnd)
   }

   const togglePasswordVisibility = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword)
   }

   const setActive = ({ isActive }) => `Enabled  ${isActive && 'active-link'}`

   return (
      <Formik
         initialValues={{
            lastpassword: '',
            newpassword: '',
            confirmpassword: '',
         }}
         validationSchema={Yup.object({
            lastpassword: Yup.string()
               .min(6, 'Старый пароль должен содержать максимум 6 символов')
               .required('Пожалуйста, напишите старый пароль'),

            newpassword: Yup.string()
               .min(6, 'Пароль должен содержать не менее 6 букв')
               .notOneOf(
                  [Yup.ref('lastpassword'), null],
                  'Новый пароль должен отличаться от старого⁠⁠'
               ),

            confirmpassword: Yup.string()
               .oneOf([Yup.ref('newpassword'), null], 'Пароли не совпадают')
               .required('Пароль не совпадают'),
         })}
         onSubmit={(values) => {
            dispatch(
               updatePassword({
                  oldPassword: values.lastpassword,
                  newPassword: values.newpassword,
               })
            )
         }}
      >
         {({ values, handleChange }) => (
            <FormStyled>
               <h2 className="cap">Профиль</h2>
               <div className="LinkTwo">
                  <NavLink to="/profile" className="my-dates">
                     ЛИЧНЫЕ ДАННЫЕ
                  </NavLink>
                  <NavLink to="/profile/password-change" className={setActive}>
                     СМЕНИТЬ ПАРОЛЬ
                  </NavLink>
               </div>
               <DivContainerStyled>
                  <h4 className="changePassword">Смена пароля</h4>
                  <div className="boxOne">
                     <label className="label" htmlFor="lastpassword">
                        Старый пароль
                     </label>
                     <InputStyled
                        width="28rem"
                        height="2.5rem"
                        type={showPassword ? 'text' : 'password'}
                        name="lastpassword"
                        placeholder="Введите ваш пароль"
                        InputProps={{
                           endAdornment: (
                              <InputAdornment className="Eyes" position="start">
                                 <IconButton
                                    onMouseDown={showPasswordHandle}
                                    onClick={togglePasswordVisibility}
                                 >
                                    {showPassword ? <ShowIcon /> : <HideIcon />}
                                 </IconButton>
                              </InputAdornment>
                           ),
                        }}
                        onChange={handleChange}
                        value={values.lastpassword}
                     />

                     <ErrorMessageStyled name="lastpassword" component="div" />
                  </div>

                  <div className="boxOne">
                     <label className="label" htmlFor="newpassword">
                        Новый пароль
                     </label>
                     <InputStyled
                        width="28rem"
                        height="2.5rem"
                        type={showPasswordCopy ? 'text' : 'password'}
                        name="newpassword"
                        placeholder="Введите новый пароль"
                        InputProps={{
                           endAdornment: (
                              <InputAdornment position="start" className="Eyes">
                                 <IconButton
                                    onMouseDown={showPasswordCopyHandler}
                                    onClick={togglePasswordVisibility}
                                 >
                                    {showPasswordCopy ? (
                                       <ShowIcon />
                                    ) : (
                                       <HideIcon />
                                    )}
                                 </IconButton>
                              </InputAdornment>
                           ),
                        }}
                        onChange={handleChange}
                        value={values.newpassword}
                     />
                     <ErrorMessageStyled name="newpassword" component="div" />
                  </div>

                  <div className="boxOne">
                     <label className="label" htmlFor="confirmpassword">
                        Подтвердить новый пароль
                     </label>
                     <InputStyled
                        width="28rem"
                        height="2.5rem"
                        type={showPasswordEnd ? 'text' : 'password'}
                        name="confirmpassword"
                        placeholder="Подтвердите пароль"
                        InputProps={{
                           endAdornment: (
                              <InputAdornment position="start" className="Eyes">
                                 <IconButton
                                    onMouseDown={showPasswordEndHandler}
                                    onClick={togglePasswordVisibility}
                                 >
                                    {showPasswordEnd ? (
                                       <ShowIcon />
                                    ) : (
                                       <HideIcon />
                                    )}
                                 </IconButton>
                              </InputAdornment>
                           ),
                        }}
                        onChange={handleChange}
                        value={values.confirmpassword}
                     />
                     <ErrorMessageStyled
                        name="confirmpassword"
                        component="div"
                     />
                  </div>
               </DivContainerStyled>

               <div className="buttonStyle">
                  <Button className="buttons" type="button" variant="outlined">
                     НАЗАД
                  </Button>
                  <Button className="buttons" type="submit">
                     ПОДТВЕРДИТЬ
                  </Button>
               </div>
            </FormStyled>
         )}
      </Formik>
   )
}

const FormStyled = styled(Form)(() => ({
   display: 'flex',
   flexDirection: 'column',
   fontFamily: 'Manrope',
   marginTop: '1rem',
   marginBottom: '8%',
   marginLeft: '7%',
   width: '62rem',
   '.buttonStyle': {
      display: 'flex',
      gap: '1rem',
      marginTop: '2rem',
   },
   '.buttons': {
      height: '2.3rem',
      width: '13.5rem',
      borderRadius: ' 0.625rem',
      fontSize: '0.675rem',
      fontFamily: 'Manrope',
      letterSpacing: '1px',
      textTransform: 'uppercase',
   },
   '&h2': {
      marginTop: '1rem',
      color: '#222222',
   },
   '&h4': {
      marginTop: '1.6rem',
      background: 'red',
      fontSize: '1.5rem',
   },
   '.LinkTwo': {
      display: 'flex',
      flexDirection: 'row',
      gap: '1.875rem',
      marginTop: '1.3rem',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      fontSize: '0.75rem',
      '.LinkTwo:onclick': {
         cursor: 'pointer',
      },
   },
   '.cap': {
      marginTop: '1.875rem',
      color: '#222222',
      fontSize: '1.5rem',
   },
   '.Enabled': {
      fontFamily: 'Manrope',
      color: '#959595',
      textDecoration: 'none',
      fontWeight: '600',
   },
   '.Enabled.active-link': {
      color: '#048741',
      textDecoration: 'underline',
   },
   '.my-dates': {
      fontFamily: 'Manrope',
      color: '#959595',
      textDecoration: 'none',
      fontWeight: '600',
   },
}))
const DivContainerStyled = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   '.boxOne': {
      display: 'flex',
      flexDirection: 'column',
      marginTop: '1.25rem',
      '.label': {
         widht: '445.45rem',
         fontFamily: 'Manrope',
         color: '#464444',
         fontSize: '1rem',
      },
   },
   '.changePassword': {
      marginTop: '1.563rem',
      fontSize: '1.2rem',
   },
}))

const ErrorMessageStyled = styled(ErrorMessage)(() => ({
   marginTop: '3.8rem',
   color: 'red',
   fontSize: '0.8rem',
   fontFamily: 'Manrope',
   position: 'absolute',
}))

const InputStyled = styled(Input)(() => ({
   '.MuiOutlinedInput-root': {
      fontFamily: 'Manrope',
      color: '#222222',
      fontSize: '1rem',
      paddingLeft: '0.125rem',
   },
}))
