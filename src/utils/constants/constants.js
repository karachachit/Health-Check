export const USER_KEY = 'HEALTH_CHECK_USER_KEY'

export const routes = {
   LOGIN: {
      changePassword: '/change-password',
   },
   ADMIN: {
      path: '/admin',
      onlineRegistration: 'online-registration',
      applications: 'applications',
      specialists: 'specialists',
      patients: 'patients',
      schedule: 'schedule',
      patientsId: 'patients/:id',
   },
   USER: {
      path: 'user',
      appointments: '/appointments',
      appointment: '/appointments/:appointmentId',
      doctors: '/doctors',
      doctor: '/doctors/:id',
   },
   DOCTOR: {
      path: '/doctor',
   },
}

export const localStorageKeys = {
   SIGN_IN_MODAL_KEY: 'IS_SIGN_IN_MODAL_OPEN',
   SIGN_UP_MODAL_KEY: 'IS_SIGN_UP_MODAL_OPEN',
   FORGOT_PASSWORD_MODAL_KEY: 'IS_FORGOT_PASSWORD_MODAL_OPEN',
   DRAWER_MODAL_KEY: 'IS_DRAWER_MODAL_OPEN',
}
