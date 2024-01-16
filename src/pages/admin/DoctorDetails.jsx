import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useDropzone } from 'react-dropzone'
import { Breadcrumbs, Stack } from '@mui/material'
import {
   changeDoctorThunk,
   specialistThunk,
} from '../../store/spesialists/specialistsThunk'
import { Input } from '../../components/UI/input/Input'
import Button from '../../components/UI/Button'
import { uploadFile } from '../../store/s3/s3Thunk'
import { notify } from '../../utils/constants/snackbar'

const DoctorDetails = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { doctorId } = useParams()

   const { selectedDoctor } = useSelector((state) => state.specialists)
   const [isEditing, setIsEditing] = useState(false)
   const [image, setImage] = useState(null)

   const { handleSubmit, register, setValue } = useForm({
      defaultValues: {
         position: selectedDoctor?.position,
         lastName: selectedDoctor?.lastName,
         firstName: selectedDoctor?.firstName,
         description: selectedDoctor?.description,
      },
   })

   useEffect(() => {
      if (doctorId) {
         dispatch(specialistThunk(doctorId))
      }
   }, [dispatch])

   useEffect(() => {
      const postFile = async () => {
         if (image) {
            try {
               const formData = new FormData()
               formData.append('file', image)

               const getFile = await dispatch(uploadFile(formData)).unwrap()
               setImage(getFile.link)
            } catch (error) {
               notify('Ошибка при загрузке файла:', 'error')
            }
         }
      }

      postFile()
   }, [image, dispatch])

   useEffect(() => {
      if (selectedDoctor?.departmentName) {
         setValue('firstName', selectedDoctor.firstName)
         setValue('lastName', selectedDoctor.lastName)
         setValue('position', selectedDoctor.position)
         setValue('description', selectedDoctor.description)
      }
   }, [selectedDoctor])

   const handleChange = (e) => {
      if (isEditing) {
         const file = e.target.files[0]
         setImage(file)
      } else {
         notify('Нельзя изменять фото в режиме просмотра', 'error')
      }
   }

   const handleDrop = (acceptedFiles) => {
      setImage(acceptedFiles[0])
   }

   const { getRootProps, getInputProps } = useDropzone({
      onDrop: handleDrop,
      accept: 'image/*',
   })

   const handleBackButtonClick = () => {
      navigate('/specialists')
   }

   const handleEditButtonClick = () => {
      setIsEditing((prevIsEditing) => !prevIsEditing)
   }

   const onSubmit = (values) => {
      console.log(values, 'value')
      const doctorInfo = {
         ...values,
         image: image !== null ? image : selectedDoctor?.image,
      }
      dispatch(changeDoctorThunk({ doctorId, departmentId: 1, doctorInfo }))
   }

   return (
      <StyledContainerApp>
         <Stack spacing={2}>
            <LinksContainer separator="›" aria-label="breadcrumb">
               <StyledNavLink to="/specialists">
                  <p>Специалисты</p>
               </StyledNavLink>
               <p className="last-child">
                  {selectedDoctor === null
                     ? null
                     : `${selectedDoctor?.firstName} ${selectedDoctor?.lastName}`}
               </p>
            </LinksContainer>
         </Stack>
         <NameStyle>
            {selectedDoctor === null
               ? null
               : `${selectedDoctor?.firstName} ${selectedDoctor?.lastName}`}
         </NameStyle>
         <div>
            <Container>
               {isEditing ? (
                  <div className="image-container" {...getRootProps()}>
                     <input {...getInputProps()} onChange={handleChange} />
                     <ImgStyle
                        src={image !== null ? image : selectedDoctor?.image}
                        alt="photos"
                     />
                     <ButtonStyle>Сменить фото</ButtonStyle>
                  </div>
               ) : (
                  <div
                     className="image-container"
                     onClick={() =>
                        notify(
                           'Нельзя изменять фото в режиме просмотра',
                           'error'
                        )
                     }
                     role="presentation"
                  >
                     <ImgStyle src={selectedDoctor?.image} alt="photos" />
                     <ButtonStyle>Сменить фото</ButtonStyle>
                  </div>
               )}

               <ContainerMain>
                  <p>Личные данные</p>
                  <Con id="hook-form">
                     <div>
                        <Row>
                           <InputLabel htmlFor="specialistName">Имя</InputLabel>
                           <Input
                              id="specialistName"
                              placeholder="Напишите имя"
                              type="text"
                              width="30.5rem"
                              disabled={!isEditing}
                              {...register('firstName')}
                           />
                        </Row>
                        <Row>
                           <InputLabel htmlFor="departmentName">
                              Отделение
                           </InputLabel>
                           <Input
                              id="departmentName"
                              placeholder="Выберите отделение"
                              type="text"
                              width="30.5rem"
                              disabled="true"
                              value={selectedDoctor?.departmentName}
                           />
                        </Row>
                     </div>
                     <div>
                        <Row>
                           <InputLabel htmlFor="specialistLastName">
                              Фамилия
                           </InputLabel>
                           <Input
                              id="specialistLastNmae"
                              placeholder="Напишите фамилию"
                              type="text"
                              width="30.5rem"
                              disabled={!isEditing}
                              {...register('lastName')}
                           />
                        </Row>
                        <Row>
                           <InputLabel htmlFor="specialistLable">
                              Должность
                           </InputLabel>
                           <Input
                              id="specialistLable"
                              placeholder="Напишите должность"
                              type="text"
                              width="30.5rem"
                              disabled={!isEditing}
                              {...register('position')}
                           />
                        </Row>
                     </div>
                  </Con>
               </ContainerMain>
            </Container>
            <ContainerDescription>
               <InputLabel htmlFor="description">Должность</InputLabel>
               <Input
                  id="description"
                  placeholder="Напишите описание"
                  type="text"
                  width="100%"
                  dispabled={!isEditing}
                  {...register('description')}
               />
            </ContainerDescription>
            <ContainerButtons>
               <Link to="/specialists">
                  <Button variant="outlined" onClick={handleBackButtonClick}>
                     {isEditing ? 'ОТМЕНИТЬ' : 'НАЗАД'}
                  </Button>
               </Link>
               <Button
                  type="submit"
                  form="hook-form"
                  onClick={handleSubmit((d) => {
                     if (isEditing) {
                        onSubmit(d)
                     }
                     handleEditButtonClick()
                  })}
               >
                  {isEditing ? 'СОХРАНИТЬ' : 'РЕДАКТИРОВАТЬ'}
               </Button>
            </ContainerButtons>
         </div>
      </StyledContainerApp>
   )
}

export default DoctorDetails

const StyledContainerApp = styled('div')`
   background-color: #f5f5f5;
   padding: calc(8vh + 3rem) 4% 3.8vh 4%;
   height: 100vh;
   div:last-child {
      background-color: #ffffff;
   }
`

const ImgStyle = styled('img')(() => ({
   width: '9rem',
   height: '9rem',
   borderRadius: '50%',
   marginTop: '1rem',
}))

const ContainerButtons = styled('div')(() => ({
   display: 'flex',
   gap: '1rem',
   justifyContent: 'flex-end',
   marginRight: '11.4rem',
   marginTop: '3rem',
   '& Button': {
      width: '15rem',
      height: '2.2rem',
   },
}))

const ContainerDescription = styled('div')(() => ({
   display: 'flex',
   textAlign: 'start',
   flexDirection: 'column',
   justifyContent: 'flex-start',
   width: '62.5rem',
   marginLeft: '14.3rem',
}))

const Container = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'flex-start',
   padding: '20px 5px',
   '.image-container': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
   },
}))

const ContainerMain = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'center',
   flexDirection: 'column',
   width: '90%',
   '& p': {
      display: 'flex',
      padding: '1rem ',
      fontWeight: '600',
      fontSize: '18px',
   },
}))
const Con = styled('form')(() => ({
   display: 'flex',
   gap: '1.5rem',
   padding: '0px 1rem',
}))

const NameStyle = styled('p')(() => ({
   display: 'flex',
   justifyContent: ' flex - start',
   fontSize: '1.3rem',
   width: 'max-width',
   padding: '2rem 0 1.5rem 0',
   fontWeight: '500',
}))

const InputLabel = styled('label')(() => ({
   marginBottom: '4px',
   display: 'flex',
   fontSize: '0.9rem',
}))

const LinksContainer = styled(Breadcrumbs)({
   p: {
      fontWeight: 400,
      fontSize: '15px',
      lineHeight: '19px',
   },
   '.last-child': {
      color: '#048741',
   },
})

const StyledNavLink = styled(NavLink)({
   textDecoration: 'none',
   color: ' #959595',
   fontFamily: 'Manrope',
   fontStyle: 'normal',
})

const Row = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   marginBottom: '16px',
}))

const ButtonStyle = styled('Button')(() => ({
   display: 'flex',
   justifyContent: 'center',
   color: '#346EFB',
   border: 'none',
   backgroundColor: '#ffffff',
   cursor: 'pointer',
   padding: '1rem',
   width: '13rem',
   alignItems: 'start',
}))
