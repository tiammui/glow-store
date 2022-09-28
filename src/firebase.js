import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';

const firebaseConfig = {
  apiKey: 'AIzaSyD_kVL0F6Lv7Dz-JY6M_kOCE5-yttHX5rQ',
  authDomain: 'glow-dab38.firebaseapp.com',
  projectId: 'glow-dab38',
  storageBucket: 'glow-dab38.appspot.com',
  messagingSenderId: '442082739011',
  appId: '1:442082739011:web:b4e16cbd384bdc269425f6',
  measurementId: 'G-KS93JSRMCT',
};

// Configure FirebaseUI.
// https://github.com/firebase/firebaseui-web-react
// https://firebase.google.com/docs/auth/web/firebaseui
export const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export const auth = firebase.auth();

// Initialize the FirebaseUI Widget using Firebase.
export const authUI = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);


export default firebase;
