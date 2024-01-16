import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
   apiKey: 'AIzaSyBzZ6jGF7R4NnONbgsurAc1OYrgpUrADV8',
   authDomain: 'health-check-fce3e.firebaseapp.com',
   projectId: 'health-check-fce3e',
   storageBucket: 'health-check-fce3e.appspot.com',
   messagingSenderId: '929453316665',
   appId: '1:929453316665:web:05b35fae9bce0932914be8',
   measurementId: 'G-5PDKTQB7T1',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export { auth, provider }
