import React from 'react'
import { useSelector } from 'react-redux'
import AdminRoutes from './adminRoutes/AdminRoutes'
import UserRoutes from './userRoutes/UserRoutes'
import GuestRoutes from './GuestRoutes'
import { USER_KEY } from '../utils/constants/constants'

const AppRoutes = () => {
   const { isAuth, role } = useSelector((state) => state.authorization)

   const storedData = JSON.parse(localStorage.getItem(USER_KEY)) || {}
   const restoredRole = storedData.role

   return (
      <>
         {isAuth && (role || restoredRole) === 'ADMIN' ? <AdminRoutes /> : null}
         {isAuth && (role || restoredRole) === 'USER' ? <UserRoutes /> : null}
         {!isAuth ? <GuestRoutes /> : null}
      </>
   )
}

export default AppRoutes
