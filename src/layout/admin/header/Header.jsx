import React from 'react'
import { styled } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { AllIcon, GroupIcon, HealthCheckIcon } from '../../../assets'
import ReusableMenu from '../../../components/UI/Menu'
import { routes } from '../../../utils/constants/routes'

const Header = ({ logoutHandler }) => {
   const menuItems = [
      {
         title: 'Администратор',
         id: 1,
      },
      {
         title: 'Выйти',
         onClick: logoutHandler,
         id: 2,
      },
   ]

   return (
      <StyleHeader>
         <div className="health-check">
            <GroupIcon />
            <HealthCheckIcon />
         </div>
         <nav>
            <ul>
               <li>
                  <StyledNavLink
                     to={routes.ADMIN.onlineRegistration}
                     activeClassName="active"
                  >
                     Онлайн-запись
                  </StyledNavLink>
               </li>
               <li>
                  <StyledNavLink
                     to={routes.ADMIN.applications}
                     activeClassName="active"
                  >
                     Заявки
                  </StyledNavLink>
               </li>
               <li>
                  <StyledNavLink
                     to={routes.ADMIN.specialists}
                     activeClassName="active"
                  >
                     Специалисты
                  </StyledNavLink>
               </li>
               <li>
                  <StyledNavLink
                     to={routes.ADMIN.patients}
                     activeClassName="active"
                  >
                     Пациенты
                  </StyledNavLink>
               </li>
            </ul>
         </nav>

         <ReusableMenu
            buttonIcon={
               <>
                  <span>Администратор</span>
                  <AllIcon />
               </>
            }
            menuItems={menuItems}
         />
      </StyleHeader>
   )
}

export default Header

const StyleHeader = styled('header')`
   position: fixed;
   z-index: 1;
   background-color: #fff;
   width: 100%;
   height: 11vh;
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 8px 3%;
   .health-check {
      display: flex;
      align-items: center;
      gap: 10px;
   }
   ul {
      display: flex;
      gap: 40px;
   }
   li {
      list-style: none;
   }
   span {
      color: #222;
      margin-right: 10px;
      font-size: 12px;
      font-weight: 500;
      font-family: 'Manrope';
   }
`

const StyledNavLink = styled(NavLink)`
   text-decoration: none;
   color: #707070;
   border-bottom: 3px solid transparent;
   padding-bottom: 3.8vh;
   &:active {
      color: #048741;
   }
   &.active {
      border-color: #048741;
      color: #222;
   }
`
