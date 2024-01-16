import React from 'react'
import { Navigate } from 'react-router-dom'

export const PrivateRoutes = ({ component, isAuth }) => {
   if (isAuth) {
      return component
   }
   return <Navigate to="/homepage" replace />
}
