import { Stack } from '@mui/system'
import styled from '@emotion/styled'
import React from 'react'
import { Breadcrumbs } from '@mui/material'
import { NavLink } from 'react-router-dom'
import Map from './Map'

const Contacts = () => {
   window.scrollTo({ top: 0 })
   return (
      <div>
         <Wrapper>
            <Stack spacing={2}>
               <Container separator="›" aria-label="breadcrumb">
                  <StyledNavLink to="/">
                     <p>Главная</p>
                  </StyledNavLink>
                  <p>Контакты</p>
               </Container>
            </Stack>
            <Titl>
               Наши <span style={{ color: '#048741' }}>контакты</span>
            </Titl>
            <Title>
               Комфорт и спокойствие пациента — это часть качественного лечения!
               Предупредите администратора, что вы едете к нам на машине и мы
               предложим бесплатную подземную парковку при нашей клинике.
            </Title>
            <ContainerInfo>
               <ContactInfo>Контактные номера:</ContactInfo>
               <ContactInfoP>
                  +996(500) 344 433 ; +996(999) 344 433
               </ContactInfoP>
            </ContainerInfo>
            <ContainerInfo>
               <ContactInfo>Наш адрес:</ContactInfo>
               <ContactInfoP>
                  Кыргызстан, г. Бишкек, Гражданская 119
               </ContactInfoP>
            </ContainerInfo>
            <ContainerInfo>
               <ContactInfo>Режим работы клиники:</ContactInfo>
               <ContactInfoP>
                  Понедельник - суббота с 08:00 до 18:00.
               </ContactInfoP>
            </ContainerInfo>
            <ContainerInfo>
               <ContactInfo>Электронная почта :</ContactInfo>
               <ContactInfoP> healthchek.kg</ContactInfoP>
            </ContainerInfo>
         </Wrapper>
         <Map />
      </div>
   )
}

export default Contacts

const Wrapper = styled('div')(() => ({
   '&': {
      paddingLeft: '100px',
      paddingBottom: '120px',
   },
}))

const Titl = styled('h2')(() => ({
   '&': {
      fontFamily: 'Manrope',
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '36px',
      lineHeight: '49px',
      color: '#222222',
      marginTop: '2rem',
   },
}))

const Title = styled('p')(() => ({
   '&': {
      fontFamily: 'Manrope',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '18px',
      color: '#4D4E51',
      width: '681px',
      paddingTop: '34px',
      paddingBottom: '40px',
   },
}))

const ContactInfo = styled('p')(() => ({
   '&': {
      fontFamily: 'Manrope',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '18px',
      color: '#222222',
   },
}))

const ContactInfoP = styled('p')(() => ({
   '&': {
      fontFamily: 'Manrope',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '18px',
      color: '#048741',
   },
}))

const ContainerInfo = styled('div')(() => ({
   '&': {
      paddingTop: '20px',
   },
}))

const Container = styled(Breadcrumbs)({
   fontWeight: 400,
   fontSize: '14px',
   lineHeight: '19px',
   paddingTop: '25px',
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

const StyledNavLink = styled(NavLink)({
   textDecoration: 'none',
   color: ' #959595',
   fontFamily: 'Manrope',
   fontStyle: 'normal',
})
