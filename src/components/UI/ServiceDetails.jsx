import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
   Accordion,
   AccordionSummary,
   AccordionDetails,
   Typography,
} from '@mui/material'
import { serviceDetails } from '../../utils/services/service_details'
import { FeedbackSlider } from './slider/FeedbackSlider'
import DoctorCard from './DoctorCard'
import { getAllDoctors } from '../../store/appointment/appointmentThunk'

const ServiceDetails = () => {
   const { id } = useParams()
   const service = serviceDetails.find((el) => el.id === parseInt(id, 10))
   const dispatch = useDispatch()
   const doctors = useSelector((state) => state.appointment.doctors)

   useEffect(() => {
      dispatch(getAllDoctors({ departmentId: id }))
   }, [dispatch, id])

   return (
      <ServiceDetailsContainer>
         <h2>{service.name}</h2>
         <p>{service.title}</p>
         <div>
            <h3>{service.questions}</h3>
            <p>{service.description}</p>
            <ul>
               {service.answers.map((item) => (
                  <li key={item.id}>{item.answer}</li>
               ))}
            </ul>
         </div>
         <div>
            <h3>{service.questionstwo}</h3>
            <p>{service.descriptiontwo}</p>
            <ul>
               {service.answersTwo.map((item) => (
                  <li key={item.id}>{item.answer}</li>
               ))}
            </ul>
         </div>
         <DoctorInfo key={service.id}>
            Цены на прием <DoctorName>{service.doctorName}</DoctorName>
         </DoctorInfo>
         <div style={{ width: '852px' }}>
            <ContainerPrice>
               <p>Услуга</p>
               <p>Стоимость</p>
            </ContainerPrice>
            {service.price.map((item) => {
               return (
                  <div key={item.id}>
                     <StyledAccordion>
                        <StyledAccordionSummary
                           expandIcon={<ExpandMoreIcon />}
                           aria-controls="panel1bh-content"
                           id="panel1bh-header"
                        >
                           <StyledInfoPriceTypography>
                              {item.title}
                           </StyledInfoPriceTypography>

                           <StyledPriceTypography
                              sx={{
                                 flexShrink: 0,
                              }}
                           >
                              {item.price}
                           </StyledPriceTypography>
                        </StyledAccordionSummary>
                        <AccordionDetails>
                           <StyledDescriptionTypography>
                              {item.description}
                           </StyledDescriptionTypography>
                        </AccordionDetails>
                     </StyledAccordion>
                  </div>
               )
            })}

            <StyledContainerPrice>
               {service.priceInfo.map((item) => (
                  <div className="title-style" key={item.titlee}>
                     <InfoPrice>{item.titlee}</InfoPrice>
                     <InfoPrice>{item.priceInfo}</InfoPrice>
                  </div>
               ))}
            </StyledContainerPrice>
         </div>
         <FeedbackSlider />
         <div>
            <StyledText>Специалисты в данном направлении</StyledText>
            {doctors && doctors.length > 0 && (
               <div>
                  <StyledDoctorCard>
                     {doctors.slice(0, 3).map((doctor) => (
                        <DoctorCard key={doctor.id} doctor={doctor} />
                     ))}
                  </StyledDoctorCard>
               </div>
            )}
         </div>
      </ServiceDetailsContainer>
   )
}

export default ServiceDetails

const ServiceDetailsContainer = styled('div')(() => ({
   padding: '3rem 7.5rem',
   fontFamily: 'Manrope',
   '& h2': {
      color: '#048741',
      fontSize: '36px',
      fontWeight: 600,
      paddingBottom: '3rem',
   },
   '& h3': {
      padding: '3rem 0 1rem',
      fontSize: '24px',
      color: '#4D4E51',
   },
   '& p': {
      color: '#222222',
   },
   '& li': {
      listStyle: '#048741',
      padding: '0.5rem',
   },
}))

const StyledAccordionSummary = styled(AccordionSummary)(() => ({
   padding: '0',
   textAlign: 'end',
   '& .MuiAccordionSummary-content': {
      display: 'flex',
      justifyContent: 'space-between',
   },
   '& .MuiAccordionDetails-root ': {
      padding: '0',
   },
}))

const StyledAccordion = styled(Accordion)(() => ({
   border: 'none',
   background: 'none',
   boxShadow: 'none',
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'flex-start',
   borderBottom: '1px solid #E0E2E7',
   '&.MuiAccordion-root': {
      margin: 0,
      padding: '0px 27px',
   },
}))
const StyledDescriptionTypography = styled(Typography)(() => ({
   color: '#4D4E51',
   fontFamily: 'Manrope',
   fontStyle: 'normal',
   fontWeight: '300',
   fontSize: '16px',
   lineHeight: '22px',
}))
const StyledText = styled('h3')(() => ({
   fontFamily: 'Manrope',
   marginTop: '4rem',
   fontSize: '24px',
   width: '600',
   padding: '20px 0',
}))

const StyledDoctorCard = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'row',
   alignItems: 'center',
   gap: '3rem',
}))

const StyledInfoPriceTypography = styled(Typography)(() => ({
   fontFamily: 'Manrope',
   fontStyle: 'normal',
   fontWeight: 500,
   fontSize: '18px',
   lineHeight: '25px',
   color: '#4D4E51',
}))

const StyledPriceTypography = styled(Typography)(() => ({
   fontFamily: 'Manrope',
   fontStyle: 'normal',
   fontWeight: 500,
   fontSize: '18px',
   lineHeight: '25px',
   color: '#4D4E51',
}))

const DoctorInfo = styled('h4')(() => ({
   paddingTop: '120px',
   fontWeight: 700,
   fontSize: '36px',
   lineHeight: '49px',
   paddingBottom: '60px',
}))

const DoctorName = styled('span')(() => ({
   color: '#048741',
}))

const ContainerPrice = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   background: '#DBF0E5',
   borderRadius: '10px',
   height: '59px',
   paddingLeft: '30px',
   paddingRight: '38px',
}))

const StyledContainerPrice = styled('div')(() => ({
   borderBottom: '1px solid #E0E2E7',
   display: 'flex',
   justifyContent: 'space-between',
   padding: '16px 12px 16px 27px',
   marginBottom: '120px',
   '& .title-style': {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
   },
}))

const InfoPrice = styled('p')(() => ({
   fontFamily: 'Manrope',
   fontStyle: 'normal',
   fontWeight: 500,
   fontSize: '18px',
   lineHeight: '25px',
   color: '#4D4E51',
   paddingRight: '22px',
}))
