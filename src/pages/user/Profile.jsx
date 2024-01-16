import { useEffect, useState } from 'react'
import { Formik, Form, ErrorMessage } from 'formik'
import { NavLink } from 'react-router-dom'
import * as Yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import { styled } from '@mui/material'
import { Input } from '../../components/UI/input/Input'
import Button from '../../components/UI/Button'
import { getProfileById, updateProfile } from '../../store/profile/profileThunk'

const Profile = () => {
   const dispatch = useDispatch()

   const { data } = useSelector((state) => state.profile) || {}

   console.log(data, 'data')

   const [initialValues, setInitialValues] = useState({
      username: '',
      userlastname: '',
      useremail: '',
      usertelefone: '',
   })

   useEffect(() => {
      dispatch(getProfileById())
   }, [dispatch])

   useEffect(() => {
      setInitialValues({
         username: data?.firstName,
         useremail: data?.email,
         userlastname: data?.lastName,
         usertelefone: data?.phoneNumber,
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
         .required('Телефон обязателен'),
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
   const handleCancel = (initialValues) => {
      console.log(initialValues)
   }
   const setActive = ({ isActive }) => `Enabled  ${isActive && 'active-link'}`

   return (
      <Formik
         initialValues={initialValues}
         validationSchema={validationSchema}
         onSubmit={onSubmit}
      >
         {({ values, handleChange }) => (
            <FormStyled>
               <h2 className="cap">Профиль</h2>
               <div className="LinkTwo">
                  <NavLink to="/profile" className={setActive}>
                     ЛИЧНЫЕ ДАННЫЕ
                  </NavLink>
                  <NavLink to="/profile/password-change" className={setActive}>
                     СМЕНИТЬ ПАРОЛЬ
                  </NavLink>
               </div>
               <h4 className="personalData">Ваши личные данные</h4>

               <div className="firstContainer">
                  <div className="Parent">
                     <div className="box">
                        <label className="label" htmlFor="username">
                           Имя
                        </label>
                        <InputStyled
                           width="30rem"
                           onChange={handleChange}
                           value={values.username}
                           type="text"
                           name="username"
                           placeholder="Имя"
                        />
                        <ErrorMessageStyled name="username" component="span" />
                     </div>
                     <div className="box">
                        <label className="label" htmlFor="useremail">
                           E-mail
                        </label>
                        <InputStyled
                           width="30rem"
                           type="text"
                           name="useremail"
                           placeholder="Email"
                           onChange={handleChange}
                           value={values.useremail}
                        />
                        <ErrorMessageStyled name="useremail" component="span" />
                     </div>
                  </div>

                  <div>
                     <div className="box">
                        <label className="label" htmlFor="userlastname">
                           Фамилия
                        </label>
                        <InputStyled
                           width="30rem"
                           onChange={handleChange}
                           value={values.userlastname}
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
                           width="30rem"
                           onChange={handleChange}
                           value={values.usertelefone}
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
         )}
      </Formik>
   )
}

export default Profile

const FormStyled = styled(Form)(() => ({
   display: 'flex',
   flexDirection: 'column',
   fontFamily: 'Manrope',
   marginTop: '1rem',
   marginBottom: '8%',
   marginLeft: '7%',
   width: '62rem',
   '.firstContainer': {
      display: 'flex',
      gap: '2rem',
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
      fontSize: '1rem',
   },
   '.personalData': {
      color: '#222222',
      fontFamily: 'Manrope',
      marginTop: '1.5rem',
      letterSpacing: '0.2px',
      fontWeight: '600',
      fontSize: '1.2rem',
   },
   '.cap': {
      marginTop: '1.875rem',
      color: '#222222',
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
      fontWeight: '600',
   },
   '.Enabled.active-link': {
      color: '#048741',
      textDecoration: 'underline',
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
      height: '2.5rem',
      fontFamily: 'Manrope',
      color: '#222222',
      fontSize: '1rem',
      padding: '8px 12px',
      '.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
         padding: '0.3rem',
         fontSize: '1rem',
      },
   },
}))

const ButtonStyled = styled('div')(() => ({
   display: 'flex',
   marginTop: '1.5rem',
   gap: '1rem',
   justifyContent: 'end',
   '& .buttonStyle': {
      height: '2.3rem',
      width: '23.4%',
      borderRadius: ' 0.625rem',
      fontSize: '0.75rem',
      fontFamily: 'Manrope',
      letterSpacing: '1px',
      textTransform: 'uppercase',
   },
}))
