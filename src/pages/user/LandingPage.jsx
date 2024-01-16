import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import { useNavigate } from 'react-router'
import Button from '../../components/UI/Button'
import { FeedbackSlider } from '../../components/UI/slider/FeedbackSlider'
import Modal from '../../components/UI/Modal'
import ApplicationForm from '../../components/ApplicationForm'
import { MainDoctorImage, WelcomeWord } from '../../assets'
import AboutClinicLayout from '../../components/AboutClinicLayout'
import {
   BEST_DOCTORS_IMAGES,
   MAIN_MED_SERVICES,
} from '../../utils/services/med_service'
import { ApplicationModal } from '../../components/ApplicationModal'
import ChangePassword from '../../layout/login/ChangePassword'

const LandingPage = ({ variant }) => {
   window.scrollTo({ top: 0 })

   const [showApplicationModal, setShowApplicationModal] = useState(false)
   const navigate = useNavigate()

   const showModalHandler = () => {
      setShowApplicationModal(true)
   }

   const closeModalHandler = () => {
      setShowApplicationModal(false)
   }

   const naviageteToServicePage = () => {
      navigate('/service')
   }

   return (
      <>
         {variant === 'password' ? <ChangePassword /> : null}
         <GlobalContainer>
            <div>
               <Box>
                  <InfoBox>
                     <img src={WelcomeWord} alt="welcomeWord" />
                     <p>
                        Международный Медицинская клиника «HealthCheck — это
                        клиника, в которой применяются новейшие диагностические
                        и лечебные технологии и ведут прием лучшие специалисты.
                     </p>
                     <Button variant="outlined" onClick={showModalHandler}>
                        ОСТАВЬТЕ ЗАЯВКУ
                     </Button>
                     <BasicModalStyle
                        open={showApplicationModal}
                        onClose={closeModalHandler}
                     >
                        <ApplicationModal onClose={closeModalHandler} />
                     </BasicModalStyle>
                  </InfoBox>
                  <img src={MainDoctorImage} alt="mainPageDoctor" />
               </Box>
               <DetailsBox>
                  <h1>
                     Почему <span>нас выбирают?</span>
                  </h1>
                  <MainInfoDepartmentBox>
                     <InfoDepartmentBox>
                        <span>1</span>
                        <h3>Высокий профессионализм сотрудников</h3>
                        <p>
                           Медицинская лицензия, большой опыт врачей и
                           постоянное повышение квалификации.
                        </p>
                     </InfoDepartmentBox>
                     <InfoDepartmentBox>
                        <span>2</span>
                        <h3>Наши пациенты - наши лучшие друзья</h3>
                        <p>
                           Все аппараты и медицинские препараты сертифицированы
                           и лицензированы.
                        </p>
                     </InfoDepartmentBox>
                     <InfoDepartmentBox>
                        <span>3</span>
                        <h3>Комфортные условия</h3>
                        <p>
                           Уютная обстановка и отзывчивый персонал сделают поход
                           в клинику максимально приятным.
                        </p>
                     </InfoDepartmentBox>
                  </MainInfoDepartmentBox>
                  <div>
                     <h1>
                        Наши <span>услуги</span>
                     </h1>
                     <Title>
                        За все время работы клиника приняла более 1 млн.
                        пациентов.
                     </Title>
                     <ServiceBox>
                        {MAIN_MED_SERVICES.map((service) => (
                           <div key={service.id}>
                              <ServiceStyle>{service.img}</ServiceStyle>
                              <ServiceTitle>{service.title}</ServiceTitle>
                           </div>
                        ))}
                     </ServiceBox>
                     <ButtonBox>
                        <Button
                           variant="outlined"
                           onClick={naviageteToServicePage}
                        >
                           Смотреть все
                        </Button>
                     </ButtonBox>
                  </div>
               </DetailsBox>
            </div>
         </GlobalContainer>
         <AboutClinicLayout />
         <GlobalDoctorContainer>
            <MainDoctorsBox>
               <h1>
                  Лучшие <span>врачи</span>
               </h1>
               <TitleStyle>
                  Попасть в команду медицинской клиники «HealthCheck» могут
                  только лучшие специалисты с многолетней практикой и доказанным
                  опытом.
               </TitleStyle>
               <DoctorsBox>
                  {BEST_DOCTORS_IMAGES.map((doctor) => (
                     <DoctorBox key={doctor.id}>
                        <DoctorsImageBox>
                           <img src={doctor.img} alt="doctorImg" />
                        </DoctorsImageBox>
                        <DoctorTitleBox>
                           <p>{doctor.name}</p>
                           <span>{doctor.description}</span>
                        </DoctorTitleBox>
                     </DoctorBox>
                  ))}
               </DoctorsBox>
               <ButtonBox>
                  <Button variant="outlined">Все врачи клиники</Button>
               </ButtonBox>
            </MainDoctorsBox>
         </GlobalDoctorContainer>
         <FeedbackSlider />
         <ApplicationForm />
      </>
   )
}

export default LandingPage

const GlobalContainer = styled('main')`
   max-width: 100%;
   display: flex;
   justify-content: center;
`

const Box = styled('div')(() => ({
   display: 'flex',
   gap: '8.5rem',
   marginTop: '22px',
   padding: '0 9%',
}))
const BasicModalStyle = styled(Modal)(() => ({
   '& .MuiBox-root': {
      borderRadius: '20px',
      background: '#EBF2FC',
      width: '659px',
      padding: '10px 10px 60px 20px',
   },
}))
const InfoBox = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'start',
   justifyContent: 'center',
   p: {
      width: '585px',
      fontFamily: 'Manrope',
      fontWeight: 400,
      fontSize: '18px',
      lineHeight: '130%',
      margin: '27px 0',
      textAlign: 'start',
   },
   button: {
      borderRadius: '24px',
   },
}))

const DetailsBox = styled('div')(() => ({
   fontFamily: 'Manrope',
   textAlign: 'start',
   marginTop: '3rem',
   marginBottom: '7rem',
   padding: '0 9%',
   h1: {
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '36px',
      lineHeight: '49px',

      span: {
         color: '#048741',
      },
   },
}))
const InfoDepartmentBox = styled('div')(() => ({
   width: '32rem',
   height: '17rem',
   background: '#DBEBFF',
   borderRadius: '4px',
   padding: '2.5rem 4rem 2.5rem 2.8rem',
   display: 'flex',
   flexDirection: 'column',
   margin: '60px 0 120px 0px',
   span: {
      fontSize: '48px',
      fontWeight: 500,
      color: '#048741',
   },
   h3: {
      fontWeight: 500,
      fontSize: '20px',
      lineHeight: '130%',
      color: '#222222',
      marginBottom: '18px',
   },
   p: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '130%',
   },
}))

const MainInfoDepartmentBox = styled('div')(() => ({
   display: 'flex',
   gap: '1.5rem',
   justifyContent: 'center',
   alignItems: 'center',
}))
const Title = styled('p')(() => ({
   fontSize: '18px',
   fontWeight: 400,
   lineHeight: '25px',
   marginTop: '34px',
}))
const ServiceStyle = styled('div')(() => ({
   border: '1px solid #DEDEDE',
   width: '102px',
   height: '106px',
   borderRadius: '18px',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   margin: '60px 0 20px 0',

   '&:hover': {
      background: ' linear-gradient(180.61deg, #0CBB6B 0.45%, #027B44 99.39%)',
      path: {
         fill: '#ffff',
      },
   },
}))
const ServiceBox = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'row',
   justifyContent: 'space-between',
   div: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
   },
}))
const ServiceTitle = styled('p')(() => ({
   fontFamily: 'Manrope',
   fontSize: '16px',
   fontWeight: 300,
   color: '#000000',
   paddingBottom: '48px',
}))
const ButtonBox = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'center',
}))
const DoctorsBox = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   gap: '3rem',
   padding: '0px 15px',
}))
const MainDoctorsBox = styled('div')(() => ({
   h1: {
      fontWeight: 600,
      fontSize: '36px',
      span: {
         color: '#048741',
      },
   },
}))
const DoctorBox = styled('div')(() => ({
   fontWeight: 500,
   p: {
      fontSize: '16px',
      lineHeight: '20px',
   },
   span: {
      color: '#959595',
      fontSize: '14px',
      textAlign: 'center',
      padding: '2px 0 52px 0',
   },
}))
const DoctorsImageBox = styled('div')(() => ({
   width: '205px',
   height: '205px',
   background:
      'radial-gradient(43.84% 43.84% at 50.16% 55.3%, #FDFDFD 0%, #E4E7EE 100%)',
   borderRadius: '50%',
   paddingTop: '14px',
   paddingLeft: '20px',

   img: {
      width: '160px',
      height: '190px',
      borderRadius: '44%',
   },
}))
const TitleStyle = styled('p')(() => ({
   fontWeight: 400,
   lineHeight: '25px',
   fontSize: '18px',
   width: '42.5rem',
   padding: '34px 0 70px 0',
}))
const DoctorTitleBox = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   textAlign: 'center',
   paddingTop: '14px',
}))
const GlobalDoctorContainer = styled('div')(() => ({
   padding: '0 7%',
   marginTop: '8rem',
   marginBottom: '7rem',
}))
