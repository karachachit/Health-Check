import React from 'react'
import { styled } from '@mui/material'
import CustomizedAccordions from './UI/Accordion'
import { faq } from '../utils/constants/accordions'

const FAQ = () => {
   return (
      <StyledAccordions>
         {faq.map((el) => (
            <CustomizedAccordions key={el.id} title={el.title}>
               <StyledData>
                  {el.data}
                  {el.list.map((item) => (
                     <ul key={item.id}>
                        <li>{item.text}</li>
                     </ul>
                  ))}
               </StyledData>
            </CustomizedAccordions>
         ))}
      </StyledAccordions>
   )
}

export default FAQ

export const StyledAccordions = styled('div')`
   display: flex;
   flex-direction: column;
   gap: 20px;
   .MuiTypography-root {
      font-family: 'Manrope';
      font-size: 20px;
   }
   h3 {
      font-size: 10px;
   }
`

const StyledData = styled('div')`
   text-align: left;
   ul {
      margin-left: 50px;
   }
   li {
      &::marker {
         color: green;
         font-size: 30px;
      }
   }
`
