import React from 'react'
import { styled } from '@mui/material'
import Button from '../UI/Button'
import { MED_SERVICE } from '../../utils/services/med_service'
import {
   ChooseDateIcon,
   ChooseServiceIcon,
   ChooseSpecialistIcon,
   Rating,
} from '../../assets'
import { SelectUI } from './Select'

const MainOnlineAppointment = ({
   openChooseSpecialist,
   openDate,
   openForm,
   service,
   specialist,
   date,
   serviceChangeHandler,
   validate,
}) => {
   return (
      <Wrapper>
         <Select
            icon={<ChooseServiceIcon />}
            value={service}
            onChange={serviceChangeHandler}
            placeholder="Выбрать услуги"
            options={MED_SERVICE}
            sx={{
               boxShadow: 'none',
               '.MuiOutlinedInput-notchedOutline': { border: 0 },
               '.css-1ka5eyc-MuiPaper-root-MuiMenu-paper-MuiPopover-paper': {
                  top: 135,
               },
            }}
         />
         <ChooseCard onClick={openChooseSpecialist}>
            {specialist ? (
               <ImageContainer>
                  <img src={specialist.image} alt="" />
               </ImageContainer>
            ) : (
               <SpecialistIcon />
            )}

            <p className="specialist">
               {specialist ? (
                  <div>
                     {specialist.fullName}
                     <span>{specialist.position}</span>
                     <p>
                        <Rating />
                        <Users>166</Users>
                     </p>
                  </div>
               ) : (
                  'Выбрать специалиста'
               )}
            </p>
         </ChooseCard>
         <ChooseCard onClick={openDate}>
            <DateIcon />
            <div>
               <Date>
                  {date ? (
                     <p>
                        <span>{date.dayOfAWeek}</span>
                        {`, ${date.day} ${date.month}`}
                     </p>
                  ) : null}
               </Date>
               <Time>{date ? `${date.time}` : 'Выбрать дату и время'}</Time>
            </div>
         </ChooseCard>
         <StyledButton onClick={openForm} disabled={validate}>
            Продолжить
         </StyledButton>
      </Wrapper>
   )
}

export default MainOnlineAppointment

const Wrapper = styled('div')(() => ({
   padding: '0 6px',
}))

const Select = styled(SelectUI)(() => ({
   padding: '10px 0',
   paddingLeft: '50px',
   margin: '6px 0',
   border: '1px solid #fff',
   outline: '1px solid #fff',
   borderRadius: '16px',
   background: '#ffffff',
   color: '#222222',
   fontSize: '16px',
   fontWeight: '500',
   'select:focus': {
      outline: 'none',
   },
   '&:hover': {
      '&& fieldset': {
         border: '1px solid #fff',
         outline: 'none',
      },
   },
   '&:active': {
      '&& fieldset': {
         border: '1px solid #fff',
         outline: 'none',
      },
   },
   '&:disabled': {
      '&& fieldset': {
         border: '1px solid #fff',
         outline: 'none',
      },
   },
}))

const ChooseCard = styled('div')(() => ({
   marginBottom: '6px',
   padding: '0 16px',
   height: '5rem',
   background: '#fff',
   color: '#222222',
   fontSize: '16px',
   fontWeight: '500',
   borderRadius: '16px',
   display: 'flex',
   alignItems: 'center',
   cursor: 'pointer',
   fontFamily: 'Manrope',
   '.specialist': {
      div: {
         display: 'flex',
         flexDirection: 'column',
         span: {
            fontFamily: 'Manrope',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '19px',
            color: '#959595',
         },
      },
   },
}))

const SpecialistIcon = styled(ChooseSpecialistIcon)(() => ({
   marginRight: '12px',
}))
const DateIcon = styled(ChooseDateIcon)(() => ({
   marginRight: '12px',
}))

const ImageContainer = styled('div')(() => ({
   width: '36px',
   height: '36px',
   marginBottom: '5%',
   marginRight: '12px',
   img: {
      width: '100%',
      height: '100%',
      borderRadius: '50%',
   },
}))

const StyledButton = styled(Button)(() => ({
   marginTop: '24px',
   width: '100%',
}))

const Date = styled('p')(() => ({
   fontFamily: 'Manrope',
   fontWeight: '500',
   fontSize: '14px',
   lineHeight: '16px',
   color: '#707070',
   span: {
      textTransform: 'capitalize',
   },
}))

const Time = styled('p')(() => ({
   fontWeight: '500',
}))

const Users = styled('span')(() => ({
   marginLeft: '8px',
   fontFamily: 'Manrope',
   fontWeight: 400,
   fontSize: '12px',
   lineHeight: '16px',
   color: '#707070',
}))
