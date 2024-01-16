import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { logout } from '../../store/auth/authSlice'
import Header from '../../layout/admin/header/Header'
import { PrivateRoutes } from '../PrivateRoutes'
import { routes } from '../../utils/constants/routes'
import { ApplicationsAdmin } from '../../pages/admin/ApplicationsAdmin'
import { PatientsAdmin } from '../../pages/admin/Patients'
import { AdminAppointmentsPage } from '../../pages/admin/AdminAppointmetsPage'
import SchedulePage from '../../pages/admin/schedule/SchedulePage'
import { notify } from '../../utils/constants/snackbar'
import { PatientsInternalPage } from '../../pages/admin/PatientsInternalPage'
import { Specialists } from '../../pages/admin/Specialists'
import DoctorDetails from '../../pages/admin/DoctorDetails'
import AddSpecialist from '../../pages/admin/AddSpecialist'

const AdminRoutes = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const { isAuth } = useSelector((state) => state.authorization)

   const logoutHandler = () => {
      dispatch(logout())
      notify('Выход успешно выполнен')
      navigate('/homepage')
   }

   useEffect(() => {
      navigate(routes.ADMIN.onlineRegistration)
   }, [])
   return (
      <>
         <Header logoutHandler={logoutHandler} />
         <Routes>
            <Route
               path="/"
               element={
                  <PrivateRoutes
                     component={<AdminAppointmentsPage />}
                     isAuth={isAuth}
                  />
               }
            />
            <Route
               path={routes.ADMIN.onlineRegistration}
               element={
                  <PrivateRoutes
                     component={<AdminAppointmentsPage />}
                     isAuth={isAuth}
                  />
               }
            />
            <Route
               path="/online-registration/schedule"
               element={
                  <PrivateRoutes component={<SchedulePage />} isAuth={isAuth} />
               }
            />
            <Route
               path={routes.ADMIN.applications}
               element={
                  <PrivateRoutes
                     component={<ApplicationsAdmin />}
                     isAuth={isAuth}
                  />
               }
            />
            <Route
               path={routes.ADMIN.specialists}
               element={
                  <PrivateRoutes component={<Specialists />} isAuth={isAuth} />
               }
            />
            <Route
               path="/specialists/doctor-details/:doctorId"
               element={<DoctorDetails />}
            />
            <Route path="/specialists/add-doctor" element={<AddSpecialist />} />
            <Route
               path={routes.ADMIN.patients}
               element={
                  <PrivateRoutes
                     component={<PatientsAdmin />}
                     isAuth={isAuth}
                  />
               }
            />
            <Route
               path={routes.ADMIN.patientsId}
               element={<PatientsInternalPage />}
            />
         </Routes>
      </>
   )
}

export default AdminRoutes
