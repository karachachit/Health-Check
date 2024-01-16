import { styled } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ErrorMessage, Form, Formik } from 'formik'
import * as Yup from 'yup'
import Button from '../components/UI/Button'
import { Input } from '../components/UI/input/Input'
import { getProfileById, updateProfile } from '../store/profile/profileThunk'

const MyInfo = () => {
   const dispatch = useDispatch()
   const data = useSelector((state) => state.profile) || {}
   const [initialValues, setInitialValues] = useState({})

   useEffect(() => {
      dispatch(getProfileById())
   }, [dispatch])

   useEffect(() => {
      setInitialValues({
         username: data.firstName,
         useremail: data.email,
         userlastname: data.lastName,
         usertelefone: data.phoneNumber,
      })
   }, [data])

   const validationSchema = Yup.object({
      username: Yup.string().required('Имя обязательно'),
      userlastname: Yup.string().required('Фамилия обязательно'),
      useremail: Yup.string()
         .email('Неверный формат электронной почты')
         .required('Неверный формат электронной почты'),
      usertelefone: Yup.string()
         .required('Телефонь обязателен')
         .min(13, 'Телефон должен содержать максимум 12 символов')
         .max(13, 'Номер телефона слишком длинный')
         .required('Телефонь обязателен'),
   })

   const onSubmit = (values) => {
      dispatch(
         updateProfile({
            firstName: values.username,
            lastName: values.userlastname,
            email: values.useremail,
            phoneNumber: values.usertelefone,
         })
      )
   }

   const handleCancel = () => {}

   return (
      <Formik
         initialValues={initialValues}
         validationSchema={validationSchema}
         onSubmit={onSubmit}
      >
         {({ handleChange, values }) => {
            let newValues
            if (Object.entries(values).length === 0) {
               newValues = initialValues
            } else {
               newValues = {
                  username: values.username,
                  useremail: values.useremail,
                  userlastname: values.userlastname,
                  usertelefone: values.usertelefone,
               }
            }
            return (
               <FormStyled>
                  <h4 className="personalData">Ваши личные данные</h4>
                  <div className="firstContainer">
                     <div className="Parent">
                        <div className="box">
                           <label className="label" htmlFor="username">
                              Имя
                           </label>
                           <InputStyled
                              onChange={handleChange}
                              value={newValues.username}
                              width="20rem"
                              type="text"
                              name="username"
                              placeholder="Имя"
                           />
                           <ErrorMessageStyled
                              name="username"
                              component="span"
                           />
                        </div>
                        <div className="box">
                           <label className="label" htmlFor="useremail">
                              E-mail
                           </label>
                           <InputStyled
                              width="20rem"
                              type="text"
                              name="useremail"
                              placeholder="Email"
                              onChange={handleChange}
                              value={newValues.useremail}
                           />
                           <ErrorMessageStyled
                              name="useremail"
                              component="span"
                           />
                        </div>
                     </div>

                     <div>
                        <div className="box">
                           <label className="label" htmlFor="userlastname">
                              Фамилия
                           </label>
                           <InputStyled
                              onChange={handleChange}
                              value={newValues.userlastname}
                              width="20rem"
                              type="text"
                              name="userlastname"
                              placeholder="Фамилия"
                           />
                           <ErrorMessageStyled
                              name="userlastname"
                              component="span"
                           />
                        </div>

                        <div className="box">
                           <label className="label" htmlFor="usertelefone">
                              Телефон
                           </label>
                           <InputStyled
                              onChange={handleChange}
                              value={newValues.usertelefone}
                              width="20rem"
                              type="text"
                              name="usertelefone"
                              placeholder="+996 (_ _ _) _ _  _ _  _ _"
                           />
                           <ErrorMessageStyled
                              name="usertelefone"
                              component="span"
                           />
                        </div>
                     </div>
                  </div>

                  <ButtonStyled>
                     <Button
                        className="buttonStyle"
                        type="button"
                        onClick={handleCancel}
                        variant="outlined"
                     >
                        назад
                     </Button>
                     <Button className="buttonStyle" type="submit">
                        Редактировать
                     </Button>
                  </ButtonStyled>
               </FormStyled>
            )
         }}
      </Formik>
   )
}

export default MyInfo

const FormStyled = styled(Form)(() => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'flex-start',
   fontFamily: 'Manrope',
   marginTop: '1rem',
   textAlign: 'start',
   '.firstContainer': {
      display: 'flex',
      gap: '2rem',
      marginLeft: '7.5rem',
   },
   '&h2': {
      marginTop: '1.8rem',
      color: '#222222',
      fontSize: '1.5rem',
   },
   '.Parent': { display: 'flex', flexDirection: 'column' },
   '.box': {
      display: 'flex',
      flexDirection: 'column',
      marginTop: '1.5rem',
   },
   '.label': {
      fontFamily: 'Manrope',
      color: '#464444',
      fontSize: '0.875rem',
   },
   '.personalData': {
      color: '#222222',
      fontFamily: 'Manrope',
      marginTop: '1.5rem',
      marginLeft: '7.6rem',
      letterSpacing: '0.2px',
      fontWeight: '600',
      fontSize: '1.125rem',
   },
}))

const ErrorMessageStyled = styled(ErrorMessage)(() => ({
   marginTop: '3.3rem',
   color: 'red',
   fontSize: '0.7rem',
   fontFamily: 'Manrope',
   position: 'absolute',
}))
const InputStyled = styled(Input)(() => ({
   '.MuiOutlinedInput-root': {
      height: '2.1rem',
      fontFamily: 'Manrope',
      color: '#222222',
      fontSize: '1rem',
      '.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
         padding: '0.300rem',
         fontSize: '1rem',
      },
   },
}))

const ButtonStyled = styled('div')(() => ({
   display: 'flex',
   marginLeft: '29.3rem',
   marginTop: '1.5rem',
   '& .buttonStyle': {
      height: '1.813rem',
      width: '9.6rem',
      borderRadius: ' 0.625rem',
      fontSize: '0.675rem',
      fontFamily: 'Manrope',
      marginLeft: '0.425rem',
      letterSpacing: '1px',
      textTransform: 'uppercase',
   },
}))
