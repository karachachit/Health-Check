import React from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { logout } from '../store/auth/authSlice'
import Header from '../layout/user/header/Header'
import LandingPage from '../pages/user/LandingPage'
import OurAllServices from '../pages/user/OurAllServices'
import AboutHealth from '../components/AboutHealth'
import Prices from '../components/Prices'
import Contacts from '../components/Contacts'
import Profile from '../pages/user/Profile'
import Footer from '../layout/Footer'
import { routes } from '../utils/constants/routes'
import Doctors from '../pages/user/Doctors'
import DoctorInnerPage from '../pages/user/DoctorInnerPage'
import ServiceDetails from '../components/UI/ServiceDetails'

const GuestRoutes = () => {
   const dispatch = useDispatch()

   const logoutHandler = () => {
      dispatch(logout())
   }
   return (
      <>
         <Header logoutHandler={logoutHandler} variant="hr" />
         {window.location.pathname === routes.LOGIN.changePassword ? (
            <LandingPage />
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
            <Route
               path={routes.LOGIN.changePassword}
               element={<LandingPage variant="password" />}
            />
            <Route path={routes.USER.doctors} element={<Doctors />} />
            <Route
               path={routes.USER.doctorDetails}
               element={<DoctorInnerPage />}
            />
         </Routes>
         <Footer />
      </>
   )
}

export default GuestRoutes
