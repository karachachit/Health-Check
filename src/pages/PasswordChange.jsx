import React, { useState } from 'react'
import { Formik, ErrorMessage, Form } from 'formik'
import { NavLink } from 'react-router-dom'
import * as Yup from 'yup'
import { IconButton, InputAdornment, styled } from '@mui/material'
import { HideIcon, ShowIcon } from '../assets'
import { Input } from '../components/UI/input/Input'
import Button from '../components/UI/Button'

export const PasswordChange = () => {
   const [showPassword, setShowPassword] = useState(false)
   const [showPasswordCopy, setShowPasswordCopy] = useState(false)
   const [showPasswordEnd, setShowPasswordEnd] = useState(false)
   const setActive = ({ isActive }) => `Enabled  ${isActive && 'active-link'}`

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
            console.log(values)
         }}
      >
         {({ values, handleChange }) => (
            <FormStyled>
               <DivContainerStyled>
                  <h2>Профиль</h2>
                  <div className="LinkTwo">
                     <NavLink className={setActive} to="/Profile">
                        личные данные
                     </NavLink>

                     <NavLink className={setActive} to="/PasswordChange">
                        Сменить пароль
                     </NavLink>
                  </div>
                  <h4 className="changePassword">Смена пароля</h4>
                  <div className="boxOne">
                     <label className="label" htmlFor="lastpassword">
                        Старый пароль
                     </label>
                     <InputStyled
                        type={showPassword ? 'text' : 'password'}
                        id="lastpassword"
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
                        type={showPasswordCopy ? 'text' : 'password'}
                        id="newpassword"
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
                        type={showPasswordEnd ? 'text' : 'password'}
                        id="confirmpassword"
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
                     назад
                  </Button>
                  <Button className="buttons" type="submit">
                     подтвердить
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
   marginLeft: '7.7rem',
   marginTop: '2.9rem',
   '.buttons': {
      height: '1.813rem',
      width: '12.6rem',
      borderRadius: ' 0.625rem',
      fontSize: '0.675rem',
      fontFamily: 'Manrope',
      marginTop: '1rem',
      marginLeft: '0.405rem',
      letterSpacing: '1px',
      textTransform: 'uppercase',
   },
   '&h2': {
      marginTop: '1rem',
      color: '#222222',
   },
   '&h4': {
      marginTop: '1.6rem',
      marginLeft: '1.6rem',
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
   '.Enabled': {
      fontFamily: 'Manrope',
      color: '#959595',
      textDecoration: 'none',
   },
   '.Enabled.active-link': {
      color: '#048741',
      textDecoration: 'underline',
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
   },
}))

const ErrorMessageStyled = styled(ErrorMessage)(() => ({
   marginTop: '0.1rem',
   color: 'red',
   fontSize: '0.7rem',
   fontFamily: 'Manrope',
}))

const InputStyled = styled(Input)(() => ({
   '.MuiOutlinedInput-root': {
      widht: '20.625rem',
      height: '1.875rem',
      fontFamily: 'Manrope',
      color: '#222222',
      fontSize: '1rem',
      paddingLeft: '0.125rem',
   },
}))
