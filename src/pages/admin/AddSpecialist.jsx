import {
   Stack,
   ToggleButtonGroup,
   ToggleButton,
   Breadcrumbs,
   TextareaAutosize,
   InputLabel,
} from '@mui/material'
import { styled as muiStyled } from '@mui/material/styles'
import { useFormik } from 'formik'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../components/UI/Button'
import AvatarUpload from '../../components/UI/Avatar'
import { B, I, U, List, Num } from '../../assets'
import { addSpecialistSchema } from '../../utils/constants/columns'
import { DEPARTMENTS } from '../../utils/services/med_service'
import { SelectUI } from '../../components/appointment/Select'
import { postNewDoctorsThunk } from '../../store/spesialists/specialistsThunk'
import { notify } from '../../utils/constants/snackbar'
import { uploadFile } from '../../store/s3/s3Thunk'
import { Input } from '../../components/UI/input/Input'

const AddSpecialist = () => {
   const navigate = useNavigate()
   const [selected, setSelected] = useState('')
   const [photo, setPhoto] = useState(null)
   const [imgUrl, setImgUrl] = useState('')
   const dispatch = useDispatch()
   const handleSelection = (event, newSelected) => {
      setSelected(newSelected)
   }
   const bold = selected.includes('bold')
   const italic = selected.includes('italic')
   const underline = selected.includes('underlined')
   const { link } = useSelector((state) => state.s3File)

   const imgChangeHandler = async (e) => {
      const image = e.target.files[0]
      const formData = new FormData()
      formData.append('file', image)
      setPhoto(formData)

      if (image) {
         const reader = new FileReader()
         reader.onload = () => {
            setImgUrl(reader.result)
         }
         reader.readAsDataURL(image)
      }
   }

   useEffect(() => {
      const postFile = async () => {
         if (photo) {
            try {
               const getFile = await dispatch(uploadFile(photo)).unwrap()
               setImgUrl(getFile.link)
            } catch (error) {
               notify('Ошибка при загрузке файла:', 'error')
            }
         }
      }

      postFile()
   }, [photo, dispatch])

   const { values, handleChange, handleSubmit, errors, touched } = useFormik({
      initialValues: {
         firstName: '',
         lastName: '',
         position: '',
         description: '',
         department: '',
      },

      validationSchema: addSpecialistSchema,
      onSubmit: async (values) => {
         const dataSpecialist = {
            firstName: values.firstName,
            lastName: values.lastName,
            image: link.link,
            position: values.position,
            description: values.description,
         }

         console.log(dataSpecialist, values.department, 'data')

         try {
            await dispatch(
               postNewDoctorsThunk({
                  dataSpecialist,
                  departmentId: values.department,
                  navigate,
               })
            )
         } catch (error) {
            notify('Ошибка при добавлении специалиста:', 'error')
         }
      },
      dependencies: [link],
   })

   return (
      <StyledContainerApp>
         <MainContainer>
            <Stack spacing={2}>
               <Container separator="›" aria-label="breadcrumb">
                  <StyledNavLink to="/specialists">
                     <p>Специалисты</p>
                  </StyledNavLink>
                  <p>Добавление специалиста</p>
               </Container>
            </Stack>
            <Title>Добавление специалиста</Title>
            <AddContainer>
               <Wrapper>
                  <div style={{ paddingRight: '40px' }}>
                     <TitlePhoto>
                        <AvatarUpload
                           onChange={imgChangeHandler}
                           photo={imgUrl}
                        />
                        <p>
                           Нажмите для добавления <br /> фотографии
                        </p>
                     </TitlePhoto>
                  </div>
                  <div>
                     <Info>Добавление специалиста</Info>
                     <form onSubmit={handleSubmit}>
                        <FormContainer>
                           <Div>
                              <StyledInputLabel htmlFor="firstName">
                                 Имя
                              </StyledInputLabel>
                              <InputStyled
                                 width="34rem"
                                 height="2.6rem"
                                 placeholder="Напишите имя"
                                 name="firstName"
                                 onChange={handleChange}
                                 value={values.firstName}
                              />
                              {touched.firstName && errors.firstName && (
                                 <StyledSpan>{errors.firstName}</StyledSpan>
                              )}
                              <StyledInputLabel style={{ marginTop: '20px' }}>
                                 Отделение
                              </StyledInputLabel>
                              <StyledSelect
                                 options={DEPARTMENTS}
                                 onChange={handleChange}
                                 value={values.department}
                                 placeholder="Выберите отделение"
                                 name="department"
                              />
                              {touched.department && errors.department && (
                                 <StyledSpan>{errors.department}</StyledSpan>
                              )}
                           </Div>

                           <Div>
                              <StyledInputLabel htmlFor="lastName">
                                 Фамилия
                              </StyledInputLabel>
                              <InputStyled
                                 width="34rem"
                                 height="2.6rem"
                                 placeholder="Напишите фамилию"
                                 onChange={handleChange}
                                 value={values.lastName}
                                 name="lastName"
                              />
                              {touched.lastName && errors.lastName && (
                                 <StyledSpan>{errors.lastName}</StyledSpan>
                              )}

                              <StyledInputLabel
                                 htmlFor="position"
                                 style={{ marginTop: '20px' }}
                              >
                                 Должность
                              </StyledInputLabel>
                              <InputStyled
                                 width="34rem"
                                 height="2.6rem"
                                 placeholder="Напишите должность"
                                 onChange={handleChange}
                                 value={values.position}
                                 name="position"
                              />
                              {touched.position && errors.position && (
                                 <StyledSpan>{errors.position}</StyledSpan>
                              )}
                           </Div>
                        </FormContainer>
                        <StyledInputLabel sx={{ marginTop: '1rem' }}>
                           Описание
                        </StyledInputLabel>
                        <div
                           style={{
                              border: '1px solid #909CB5',
                              width: '97.3%',
                              borderRadius: '5px',
                           }}
                        >
                           <ToggleButtonGroup
                              value={selected}
                              onChange={handleSelection}
                              aria-label="text formatting"
                              style={{
                                 display: 'flex',
                                 gap: '2rem',
                                 borderBottom: '1px solid #909CB5',
                              }}
                           >
                              <IconStyled value="bold" aria-label="bold">
                                 <B />
                              </IconStyled>
                              <IconStyled value="italic" aria-label="italic">
                                 <I />
                              </IconStyled>
                              <IconStyled
                                 value="underlined"
                                 aria-label="underlined"
                              >
                                 <U />
                              </IconStyled>
                              <IconStyled value="list" aria-label="list">
                                 <List />
                              </IconStyled>
                              <IconStyled value="number" aria-label="number">
                                 <Num />
                              </IconStyled>
                           </ToggleButtonGroup>
                           <StyledTextField
                              placeholder="Введите описание специалиста"
                              onChange={handleChange}
                              value={values.description}
                              name="description"
                              minRows={10}
                              maxRows={30}
                              bold={bold}
                              italic={italic}
                              underline={underline}
                           />
                           {touched.description && errors.description && (
                              <StyledSpan>{errors.description}</StyledSpan>
                           )}
                        </div>
                        <StyledContainerButton>
                           <StyledCancel
                              onClick={() => {
                                 navigate('/admin/specialists')
                              }}
                           >
                              Отменить
                           </StyledCancel>
                           <Button
                              style={{ padding: '10px 85px' }}
                              type="submit"
                           >
                              Добавить
                           </Button>
                        </StyledContainerButton>
                     </form>
                  </div>
               </Wrapper>
            </AddContainer>
         </MainContainer>
      </StyledContainerApp>
   )
}

export default AddSpecialist

const StyledContainerApp = styled('div')`
   background-color: #f5f5f5;
   padding: calc(11vh + 3rem) 4% 3.8vh 4%;
   height: 200vh;
`

const Title = muiStyled('h3')(() => ({
   fontSize: '22px',
   fontWeight: '500',
   margin: '1.8rem 0',
}))

const FormContainer = muiStyled('div')(() => ({
   '&': {
      display: 'flex',
   },
}))

const Div = muiStyled('div')(() => ({
   '&': {
      display: 'flex',
      flexDirection: 'column',
      marginRight: '2rem',
   },
}))

const Info = muiStyled('p')(() => ({
   '&': {
      marginBottom: '20px',
      color: '#222222',
      fontSize: '18px',
      letterSpacing: '0.2px',
      fontWeight: 600,
   },
}))

const StyledSelect = styled(SelectUI)(() => ({
   fontSize: '1rem',
   height: '2.6rem',
   borderRadius: '6px !important',
}))

const StyledCancel = styled(Button)(() => ({
   '&': {
      background: 'none',
      color: '#959595',
      border: '1px solid#959595',
      padding: '10px 85px',
      ':hover': {
         background: 'none',
         color: '#959595',
      },
   },
}))

const StyledContainerButton = styled('div')(() => ({
   marginTop: '68px',
   display: 'flex',
   justifyContent: 'end',
   marginRight: '2rem',
   gap: '1rem',
}))

const IconStyled = styled(ToggleButton)(() => ({
   border: 'none',
}))

const StyledSpan = styled('span')(() => ({
   fontSize: '13px',
   color: 'red',
}))

const MainContainer = muiStyled('div')(() => ({
   '&': {
      width: '100%',
      height: '100%',
      background: 'rgba(245, 245, 245, 0.61)',
      fontFamily: 'Manrope',
   },
}))
const Container = muiStyled(Breadcrumbs)({
   fontWeight: 400,
   fontSize: '14px',
   lineHeight: '19px',
   marginTop: '30px',
   marginBottom: '26px',
   fontFamily: 'Manrope',
   fontStyle: 'normal',
   '& .css-1bifq5f-MuiTypography-root-MuiBreadcrumbs-root': {
      fontFamily: 'Manrope',
   },
   ':last-child': {
      color: '#048741',
   },
})

const StyledNavLink = muiStyled(NavLink)({
   textDecoration: 'none',
   color: ' #959595',
   fontFamily: 'Manrope',
   fontStyle: 'normal',
})

const AddContainer = muiStyled('div')(() => ({
   '&': {
      background: '#FFFFFF',
      borderRadius: '6px',
      height: '100%',
   },
}))

const InputStyled = styled(Input)(() => ({}))

const StyledTextField = styled(TextareaAutosize)((styles) => ({
   '&': {
      width: '100%',
      color: '#959595',
      fontSize: '16px',
      paddingLeft: '20px',
      paddingTop: '16px',
      border: '1px solid white',
      fontWeight: styles.bold ? 700 : 400,
      fontStyle: styles.italic ? 'italic' : '',
      textDecoration: styles.underline ? 'underline' : '',
      listStyle: 'square',
      '& .ccs-btngv5': {
         outline: 'none',
      },
   },
}))

const Wrapper = styled('div')(() => ({
   '&': {
      paddingTop: '40px',
      display: 'flex',
      marginRight: '43px',
   },
}))
const TitlePhoto = muiStyled('p')(() => ({
   '&': {
      fontFamily: 'Manrope',
      color: '#909CB5',
      textAlign: 'center',
      fontSize: '12px',
      paddingLeft: '1rem',
   },
}))

const StyledInputLabel = styled(InputLabel)(() => ({
   color: '#464444',
   fontWeight: 400,
   fontSize: '15px',
   fontFamily: 'Manrope',
   fontStyle: 'normal',
}))
