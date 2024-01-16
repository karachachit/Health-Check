import React, { useState } from 'react'
import styled from '@emotion/styled'
import { FormLabel, InputAdornment } from '@mui/material'
import { useDispatch } from 'react-redux'
import PhotoWoman from '../assets/images/applicationform-woman.png'
import Button from './UI/Button'
import { UserIcon, PhoneIcon, ArrowIcon } from '../assets'
import { Input } from './UI/input/Input'
import { addApplications } from '../store/applications/applicationsThunk'

const ApplicationForm = () => {
   const [formData, setFormData] = useState({
      name: '',
      phoneNumber: '',
   })

   const [errors, setErrors] = useState({
      name: '',
      phoneNumber: '',
   })

   const dispatch = useDispatch()

   const handleChange = (e) => {
      const { name, value } = e.target
      const sanitizedValue =
         name === 'phoneNumber' ? value.replace(/\s/g, '') : value
      setFormData({
         ...formData,
         [name]: sanitizedValue,
      })

      if (name === 'name') {
         const nameRegex = /^[A-Za-zА-Яа-я\s]+$/
         if (!nameRegex.test(sanitizedValue)) {
            setErrors({
               ...errors,
               name: 'Неправильное имя',
            })
         } else {
            setErrors({
               ...errors,
               name: '',
            })
         }
      } else if (name === 'phoneNumber') {
         const phoneRegex = /^(?:\+996|0)\d{9}$/
         if (!phoneRegex.test(sanitizedValue)) {
            setErrors({
               ...errors,
               phoneNumber: 'Неправильный номер',
            })
         } else {
            setErrors({
               ...errors,
               phoneNumber: '',
            })
         }
      }
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      if (!formData.name || !formData.phoneNumber) {
         setErrors({
            ...errors,
            name: !formData.name ? 'Это поле обязательно' : '',
            phoneNumber: !formData.phoneNumber ? 'Это поле обязательно' : '',
         })
         return
      }
      dispatch(
         addApplications({
            name: formData.name,
            phoneNumber: formData.phoneNumber,
         })
      )
   }
   return (
      <ApplicationFormContainer>
         <ApplicationFormInnerContainer>
            <h2>Оставьте заявку</h2>
            <p>
               Оставьте свой номер и наши специалисты свяжутся с Вами <br />в
               ближайшее время
            </p>

            <form onSubmit={handleSubmit}>
               <div>
                  <FormLabel>Как к Вам обратиться?</FormLabel>
                  <Input
                     className="input-container"
                     InputProps={{
                        startAdornment: (
                           <InputAdornment position="start">
                              <UserIcon className="inner_icon" />
                           </InputAdornment>
                        ),
                     }}
                     name="name"
                     value={formData.name}
                     onChange={handleChange}
                     placeholder="Введите имя"
                     width="16rem"
                     height="2.6rem"
                  />
                  <span className="error-message">{errors.name}</span>
               </div>
               <div>
                  <FormLabel>Номер мобильного телефона</FormLabel>
                  <Input
                     className="input-container"
                     InputProps={{
                        startAdornment: (
                           <InputAdornment position="start">
                              <PhoneIcon className="inner_icon" />
                           </InputAdornment>
                        ),
                     }}
                     name="phoneNumber"
                     value={formData.phoneNumber}
                     onChange={handleChange}
                     placeholder="+996 (___) __-__-__"
                     width="16rem"
                     height="2.6rem"
                  />
                  <span className="error-message">{errors.phoneNumber}</span>
               </div>
            </form>
            <StyledButton type="submit" onClick={handleSubmit}>
               ОТПРАВИТЬ ЗАЯВКУ <ArrowIcon className="arrow-icon" />
            </StyledButton>
         </ApplicationFormInnerContainer>
         <img src={PhotoWoman} alt="" />
      </ApplicationFormContainer>
   )
}

export default ApplicationForm

const ApplicationFormContainer = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'row',
   padding: '5rem 7.5rem',
   fontFamily: 'Manrope',
   h2: {
      fontSize: '2.2rem',
      fontWeight: '500',
      textAlign: 'center',
   },
   p: {
      fontSize: '1.1rem',
      fontWeight: '400',
      textAlign: 'center',
      paddingTop: '2rem',
   },
   img: {
      marginLeft: '-5rem',
   },
}))

const ApplicationFormInnerContainer = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   marginTop: '80px',
   background: '#DBEBFF',
   borderRadius: '1rem',
   padding: '60px',
   gap: '1rem',
   form: {
      display: 'flex',
      flexDirection: 'row',
      textAlign: 'start',
      gap: '1rem',
      padding: '2rem',
      div: {
         display: 'flex',
         flexDirection: 'column',
         position: 'relative',
         top: '4px',
      },
      label: {
         fontSize: '0.9rem',
         color: '#4D4E40',
         fontFamily: 'inherit',
      },
      span: {
         color: 'red',
         position: 'absolute',
         top: '4.5rem',
      },
      '& input': {
         background: '#fff',
         width: '11rem',
         height: '0.1rem',
      },
      '& .input-container': {
         width: '16rem',
         height: '2.77rem',
         background: '#ffff',
         borderRadius: '8px',
         '& .inner_icon': {
            position: 'absolute',
            right: '6.3rem',
            top: '0.3rem',
         },
      },
   },
}))

const StyledButton = styled(Button)(() => ({
   borderRadius: '3rem',
   '& .arrow-icon': {
      marginLeft: '0.5rem',
   },
}))
