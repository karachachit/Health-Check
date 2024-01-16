export const routes = {
   LOGIN: {
      changePassword: '/change-password/:uniqueId',
   },
   ADMIN: {
      path: '/online-registration',
      onlineRegistration: '/online-registration',
      applications: '/applications',
      specialists: '/specialists',
      patients: '/patients',
      patientsId: '/patients/:patientId',
   },
   USER: {
      path: '/homepage',
      service: '/service',
      doctors: '/doctors',
      doctorDetails: '/doctors/:doctorId',
      aboutClinic: '/about-clinic',
      prices: '/prices',
      contacts: '/contacts',
   },
}
