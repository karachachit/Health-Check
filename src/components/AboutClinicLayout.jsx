import React from 'react'
import styled from '@emotion/styled'
import { NavLink } from 'react-router-dom'
import Button from './UI/Button'

import {
   Building,
   Conference,
   Consilium,
   Doctors,
   ForwardVector,
} from '../assets'

const AboutClinicLayout = ({ variant, onClick }) => {
   return (
      <Block>
         <StyledMainBlock>
            <StyledAboutSecondText>
               <StyledTitleText>
                  О нашей клинике
                  <span> “HealthCheck”</span>
               </StyledTitleText>
               <p>
                  Вся наша команда готова обеспечить вам медицинский уход
                  <br /> и заботу на самом высоком уровне. Наша главная задача —
                  оказать <br /> Вам теплый прием и обеспечить самый лучший
                  медицинский уход. <br /> У нас Вы в хороших руках! В нашей
                  клинике используются только <br />
                  качественные материалы и проверенные технологии. Для каждого
                  <br />
                  клиента специалисты нашей клиники разработают <br />
                  индивидуальный план лечения, подробно рассказывая о каждом
                  <br /> этапе.
               </p>
               <p>
                  Доброжелательность и уважительное отношение к пациентам,
                  <br /> не только материальная, но и моральная ответственность
                  <br /> за результаты лечения — все это взято за основу
                  политики Medical <br /> Clinic. Профессионализм и высокое
                  качество оказываемых услуг
                  <br />
                  помогают нам привлечь пациентов которые рекомендуют нас
                  <br /> своим родным и близким.
               </p>
               <p>
                  Уже 20 лет мы работаем на уровне лучших мировых стандартов,
                  <br />
                  внедряя и развивая передовые методы лечения для сохранения
                  <br />
                  здоровья наших пациентов.
               </p>

               {variant === 'button' ? (
                  <StyledButton variant="outlined" onClick={onClick}>
                     Записаться на консультацию
                  </StyledButton>
               ) : (
                  <StyledNavlink to="about">
                     Читать подробнее o клинике <ForwardVector />
                  </StyledNavlink>
               )}
            </StyledAboutSecondText>
            <StyledImageBlock>
               <StyledBuildingImG src={Building} alt="" />

               <StyledSlidingImG>
                  <StyledBuildingImG src={Conference} alt="conference" />
                  <StyledCenterBuildingImG src={Doctors} alt="doctors" />
                  <StyledBuildingImG src={Consilium} alt="consilium" />
               </StyledSlidingImG>
            </StyledImageBlock>
         </StyledMainBlock>
      </Block>
   )
}

export default AboutClinicLayout

const StyledAboutSecondText = styled.div`
   width: 50%;
   height: 34rem;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   font-size: 1rem;
   font-style: normal;
   font-weight: 400;
   line-height: 160%;
   color: #4d4e51;
   gap: 2rem;
   & p {
      font-size: 1.1rem;
      line-height: 1.625rem;
      font-weight: 400;
      font-style: normal;
      color: #4d4e51;
   }
`
const StyledMainBlock = styled.div`
   height: '34rem';
   display: flex;
   flex-direction: row;
   gap: 10rem;
`
const StyledImageBlock = styled.div`
   margin-top: 8rem;
   h3 {
      font-size: 1.13rem;
      font-weight: 400;
      line-height: 1.563rem;
      color: #048741;
   }

   h2 {
      font-size: 1.4rem;
      font-weight: 400;
      line-height: 1.875rem;
      color: #222222;
   }
`
const Block = styled.div`
   padding-left: 5.625rem;
   padding-right: 4.375rem;
   max-width: 100%;
   display: flex;
   justify-content: center;
   span {
      color: #048741;
   }
`

const StyledTitleText = styled.h1`
   font-size: 2.25rem;
   font-weight: 600;
   line-height: 3.074;
   color: #000000;
`

const StyledBuildingImG = styled('img')(() => ({
   width: '95%',
   height: '24.875rem',
   marginTop: '1.25rem ',
}))
const StyledCenterBuildingImG = styled('img')(() => ({
   marginLeft: '1.25rem',
   marginRight: '1.25rem',
}))
const StyledSlidingImG = styled('div')(() => ({
   display: ' flex',
   img: {
      width: '29%',
      height: '7.5rem',
      borderRadius: '0.5rem',
      gap: '1.625rem',
      marginTop: '1.25rem ',
   },
}))

const StyledNavlink = styled(NavLink)(() => ({
   width: '15.5rem',
   color: '#009344',
   fontSize: '1rem',
   fontWeight: 500,
   textDecoration: 'none',
   cursor: 'pointer',
   paddingTop: '1rem',
}))

const StyledButton = styled(Button)(() => ({
   alignSelf: 'start',
   marginTop: '1.25rem',
}))
