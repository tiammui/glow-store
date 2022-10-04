import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';

import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { UserMaker,ProductMaker } from './mockbase';

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
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
      buttonColor: '#2F2F2F',
      fullLabel: 'Sign in / Sign up with email',
    },
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      fullLabel: 'Sign in / Sign up with Google',
    },
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      var user = authResult.user;
      var credential = authResult.credential;
      var isNewUser = authResult.additionalUserInfo.isNewUser;
      var providerId = authResult.additionalUserInfo.providerId;
      var operationType = authResult.operationType;

      console.log(authResult);
      // Do something with the returned AuthResult.
      // Return type determines whether we continue the redirect
      // automatically or whether we leave that to developer to handle.
      return false;
    },
    uiShown: () => false,
  },
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export const auth = firebase.auth();

// Initialize the FirebaseUI Widget using Firebase.
export const authUI =
  firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

/**
 * Can be used in future, but not needed now
 */
  // async function getFireInitDoc() {
  //   let initDoc = await db
  //     .doc('General/init')
  //     .get()
  //     .then((docSnap) => docSnap.data())
  //     .catch(console.log);

  //   return initDoc;
  // }

export async function getFireOrder(orderId) {
  let orderDoc = await db
    .doc('orders/' + orderId)
    .get()
    .then((docSnap) => docSnap.data())
    .catch(console.log);

  return orderDoc;
}
export async function getFireProduct(productId) {
  let productDoc = await db
    .doc('products/' + productId)
    .get()
    .then((docSnap) => docSnap.data())
    .catch(handleFireError);
    
    productDoc = !productDoc && (new ProductMaker());
    return productDoc;
}
export async function getFireUserDoc(userId) {
  let userDoc = await db
    .doc('users/' + userId)
    .get()
    .then((docSnap) => docSnap.data())
    .catch(console.error);

  return userDoc;
}

/**
 * 
 * @param {boolean} isQuery false if the error pops due to product doc request
 */
function handleFireError(err,isQuery){
  // check type of error and react accordingly, show snackbar where necessary

  console.error(err)
}

/**
 * @param {""|'category'|'discount'|'price'} by
 * @param {{category:string,minValue:number,maxValue:number}} valueOption
 * @param {{lastDocObj:{},docsToFetch:number}} paginateOption
 */
export async function queryFireProducts(by, valueOption, paginateOption) {
  if (by == 'category') {

    // check for if valueOption.category === "all", to handle query differently

    if (paginateOption.lastDocObj) {
      return await db
        .collection('products')
        .where(by, '==', valueOption.category)
        .orderBy('price')
        .startAfter(paginateOption.lastDocObj)
        .limit(paginateOption.docsToFetch)
        .get()
        .then((querySnap) => querySnap.docs);
    }

    return await db
      .collection('products')
      .where(by, '==', valueOption.category)
      .orderBy('price')
      .limit(paginateOption.docsToFetch)
      .get()
      .then((querySnap) => querySnap.docs);
  }
}
/**
 * @param {'cart'|'details'} type
 * @param {UserMaker} updateObj
 */
export function updateFireUserDoc(userId, type, updateObj) {
  db.doc('users/' + userId)
    .set(updateObj, { merge: true })
    .catch(console.log);
}
export async function fireUserDocExists(userId) {
  let docExists = await db
    .doc('users/' + userId)
    .get()
    .then((docSnap) => docSnap.exists)
    .catch(console.log);

  return docExists;
}

export default firebase;
