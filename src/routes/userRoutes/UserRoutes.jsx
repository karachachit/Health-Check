import React from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { logout } from '../../store/auth/authSlice'
import Header from '../../layout/user/header/Header'
import LandingPage from '../../pages/user/LandingPage'
import OurAllServices from '../../pages/user/OurAllServices'
import AboutHealth from '../../components/AboutHealth'
import Prices from '../../components/Prices'
import Contacts from '../../components/Contacts'
import Profile from '../../pages/user/Profile'
import Footer from '../../layout/Footer'
import { notify } from '../../utils/constants/snackbar'
import { TableParents } from '../../components/UI/TableParents'
import PatientTable from '../../components/UI/PatientTable'
import { PasswordChange } from '../../pages/user/PasswordChange'
import GetResult from '../../pages/user/GetResult'
import Doctors from '../../pages/user/Doctors'
import DoctorInnerPage from '../../pages/user/DoctorInnerPage'
import { routes } from '../../utils/constants/routes'
import ServiceDetails from '../../components/UI/ServiceDetails'

const UserRoutes = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const logoutHandler = () => {
      dispatch(logout())
      notify('Выход успешно выполнен')
      navigate('/homepage')
   }
   return (
      <>
         {window.location.pathname !== '/results' ? (
            <Header logoutHandler={logoutHandler} variant="hr" />
         ) : null}
         <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/homepage" element={<LandingPage />} />
            <Route path="/service" element={<OurAllServices />} />
            <Route path="/about-clinic" element={<AboutHealth />} />
            <Route path="/prices" element={<Prices />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/service" element={<OurAllServices />} />
            <Route path="/service/:id/details" element={<ServiceDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/my-notes" element={<TableParents />} />
            <Route
               path="/profile/my-notes/:appointmentId"
               element={<PatientTable />}
            />
            <Route
               path="/profile/password-change"
               element={<PasswordChange />}
            />
            <Route path={routes.USER.doctors} element={<Doctors />} />
            <Route
               path={routes.USER.doctorDetails}
               element={<DoctorInnerPage />}
            />
            <Route path="/results" element={<GetResult />} />
         </Routes>
         {window.location.pathname !== '/results' ? <Footer /> : null}
      </>
   )
}

export default UserRoutes
