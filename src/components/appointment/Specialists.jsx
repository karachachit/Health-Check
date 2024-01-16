import React from 'react'
import { styled } from '@mui/material'
import { Rating } from '../../assets'

const Specialists = ({
   id,
   fullName,
   image,
   position,
   openChooseSpecialistTime,
}) => {
   return (
      <Card>
         <Profile
            onClick={() =>
               openChooseSpecialistTime({ image, fullName, id, position })
            }
         >
            <ImageContainer>
               <Image src={image} alt="" />
            </ImageContainer>
            <About>
               <Title>{fullName}</Title>
               <Description>{position}</Description>
               <RatingContainer>
                  <Rating />
                  <Users>166</Users>
               </RatingContainer>
            </About>
         </Profile>
      </Card>
   )
}

export default Specialists

const Card = styled('div')(() => ({
   padding: '19px 16px',
   margin: '6px',
   background: '#fff',
   color: '#222222',
   fontSize: '16px',
   fontWeight: '500',
   borderRadius: '16px',
   display: 'flex',
   flexDirection: 'column',
   cursor: 'pointer',
   border: '1px solid #D9D9D9',
}))

const Profile = styled('div')(() => ({
   display: 'flex',
}))

const ImageContainer = styled('div')(() => ({
   width: '36px',
   height: '36px',
}))

const Image = styled('img')(() => ({
   width: '100%',
   height: '100%',
   borderRadius: '50%',
}))
const About = styled('div')(() => ({
   marginLeft: '10px',
}))

const Title = styled('h4')(() => ({
   fontFamily: 'Manrope',
   fontWeight: 500,
   fontSize: '16px',
   lineHeight: '19px',
}))

const Description = styled('p')(() => ({
   fontFamily: 'Manrope',
   fontWeight: 500,
   fontSize: '14px',
   lineHeight: '19px',
   color: '#959595',
}))

const RatingContainer = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
}))

const Users = styled('span')(() => ({
   marginLeft: '8px',
   fontFamily: 'Manrope',
   fontStyle: 'normal',
   fontWeight: 400,
   fontSize: '12px',
   lineHeight: '16px',
   color: '#707070',
}))
