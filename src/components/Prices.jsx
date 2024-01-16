import React from 'react'
import { styled } from '@mui/material'
import CustomizedAccordions from './UI/Accordion'
import { prices } from '../utils/constants/accordions'

const Prices = () => {
   window.scrollTo({ top: 0 })
   return (
      <>
         <MainPart>
            <a href="/">Главная {'>'}</a>
            <span className="service"> Прайс</span>
         </MainPart>
         <ServiceStyle>
            <span>Наш</span>
            <span className="our_service"> прайс</span>
         </ServiceStyle>
         <P>
            Цены на услуги формируются в соответствии с действующими
            Прейскурантами. Общая стоимость зависит от объема услуг, оказываемых
            в рамках приёма. Объём оказываемых услуг определяется врачом, исходя
            из показаний для обследования и пожеланий клиента.
         </P>

         <AccordionContainer>
            <StyledAccordions>
               {prices.map((el) => (
                  <CustomizedAccordions key={el.id} title={el.title}>
                     <StyledPrice>
                        <div className="prices-data">
                           <h2>{el.data}</h2> <h2>{el.price}com</h2>
                        </div>

                        <p className="description">{el.description}</p>
                        {el.prices.map((item) => (
                           <div className="prices">
                              <h3>{item.data}</h3>
                              <h2>{item.price}com</h2>
                           </div>
                        ))}
                     </StyledPrice>
                  </CustomizedAccordions>
               ))}
            </StyledAccordions>
         </AccordionContainer>
      </>
   )
}

export default Prices

export const StyledAccordions = styled('div')`
   display: flex;
   flex-direction: column;
   gap: 20px;
   .MuiTypography-root {
      font-family: 'Manrope';
      font-size: 20px;
   }
   .description {
      font-size: 18px;
      margin-top: 1rem;
      margin-bottom: 1rem;
   }
   h3 {
      font-size: 18px;
      font-weight: 575;
   }
   h2 {
      font-weight: 500;
      font-size: 20px;
   }
   .prices-data {
      display: flex;
      justify-content: space-between;
   }
   .prices {
      display: flex;
      justify-content: space-between;
      padding: 10px 0px;
      border-top: 1px solid #e0e2e7;
   }
`

const StyledPrice = styled('div')`
   text-align: left;
`

const AccordionContainer = styled('div')(() => ({
   width: '60%',
   marginLeft: '98px',
   marginBottom: '100px',
}))

const MainPart = styled('p')(() => ({
   marginLeft: '95px',
   fontFamily: ' Manrope',
   fontSize: '14px',
   fontWeight: 400,
   lineHeight: '19px',
   textAlign: 'left',
   paddingTop: '25px',
   a: {
      color: '#959595',
      textDecoration: 'none',
   },
   '& .service': {
      color: '#048741',
   },
}))

const ServiceStyle = styled('div')(() => ({
   fontSize: '36px',
   fontWeight: 600,
   lineHeight: '49px',
   fontFamily: 'Manrope',
   color: '#222222',
   marginLeft: '95px',
   marginBottom: '34px',
   marginTop: '26px',
   '& .our_service': {
      color: '#048741',
   },
}))
const P = styled('p')(() => ({
   width: '691px',
   height: '100px',
   fontSize: '18px',
   fontWeight: 400,
   lineHeight: '24px',
   color: ' #4D4E51',
   fontFamily: ' Manrope',
   marginLeft: '95px',
   marginBottom: '40px',
}))
