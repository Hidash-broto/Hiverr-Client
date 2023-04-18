import {initializeApp} from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAhR-4d_pVAUdpcprI6Gwd_ufFTJC2fa18",
    authDomain: "hiverr-ee832.firebaseapp.com",
    projectId: "hiverr-ee832",
    storageBucket: "hiverr-ee832.appspot.com",
    messagingSenderId: "1081981055638",
    appId: "1:1081981055638:web:b6b9226b19170ccea608b7",
    measurementId: "G-D0BVQCTLRG"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export {auth, provider}