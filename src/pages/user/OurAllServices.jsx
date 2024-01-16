import React from 'react'
import styled from '@emotion/styled'
import { Breadcrumbs, Stack } from '@mui/material'
import { NavLink } from 'react-router-dom'
import ServiceCard from '../../components/UI/ServiceCard'
import ApplicationForm from '../../components/ApplicationForm'
import FAQ from '../../components/FAQ'

const OurAllServices = () => {
   window.scrollTo({ top: 0 })
   return (
      <div>
         <ServiceStyle>
            <StyledStack spacing={2}>
               <Container separator="›" aria-label="breadcrumb">
                  <StyledNavLink to="/">
                     <p>Главная</p>
                  </StyledNavLink>
                  <p>Услуги</p>
               </Container>
            </StyledStack>
            <span className="label">Наши</span>
            <span className="our_service"> услуги</span>

            <ServiceCard />
            <SelectContent>
               <p className="topic">Часто задаваемые вопросы</p>
               <p className="info">
                  Специалисты нашей клиники с удовольствием ответят на все ваши
                  вопросы. <br /> Ниже представленны наиболее популярные.
               </p>
               <FAQ />
            </SelectContent>
         </ServiceStyle>
         <ApplicationForm />
      </div>
   )
}

export default OurAllServices

const StyledStack = styled(Stack)(() => ({
   marginBottom: '2rem',
}))

const Container = styled(Breadcrumbs)({
   fontWeight: 400,
   fontSize: '14px',
   lineHeight: '19px',
   paddingTop: '25px',
   fontFamily: 'Manrope',
   fontStyle: 'normal',
   '& .css-1bifq5f-MuiTypography-root-MuiBreadcrumbs-root': {
      fontFamily: 'Manrope',
   },
   ':last-child': {
      color: '#048741',
   },
})

const StyledNavLink = styled(NavLink)({
   textDecoration: 'none',
   color: ' #959595',
   fontFamily: 'Manrope',
   fontStyle: 'normal',
})

const ServiceStyle = styled('div')(() => ({
   fontSize: '36px',
   fontWeight: 600,
   fontFamily: 'Manrope',
   lineHeight: '49px',
   color: '#222222',
   marginLeft: '95px',
   marginBottom: '60px',
   marginTop: '26px',
   '& .our_service': {
      color: '#048741',
   },
}))

const SelectContent = styled('div')(() => ({
   width: '60%',
   height: 'auto',
   '& .topic': {
      fontFamily: 'Manrope',
      fontSize: '34px',
      fontWeight: 500,
      lineHeight: '36px',
      letterSpacing: '0em',
      textAlign: 'left',
      height: '36px',
      top: '1760px',
      borderRadius: 'nullpx',
      marginBottom: '34px',
      color: '#222222',
   },
   '& .info': {
      color: 'var(--primary-black-gray, #4D4E51)',
      fontSize: '18px',
      lineHeight: ' 25px',
      fontWeight: '400',
      marginBottom: '16px',
   },
}))
