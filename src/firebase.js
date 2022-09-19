import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs,addDoc, Timestamp,query, orderBy, onSnapshot,doc, updateDoc, deleteDoc } from 'firebase/firestore/lite';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  //...
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get a list of cities from your database
async function getCities(db) {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}

function a(){
  await addDoc(collection(db, 'tasks'), {
    title: title,
    description: description,
    completed: false,
    created: Timestamp.now()
  })
}

/* function to update document in firestore */
const handleUpdate = async (e) => {
  e.preventDefault()
  const taskDocRef = doc(db, 'tasks', id)
  try{
    await updateDoc(taskDocRef, {
      title: title,
      description: description
    })
    onClose()
  } catch (err) {
    alert(err)
  }    
}

/* function to delete a document from firstore */ 
const handleDelete = async () => {
  const taskDocRef = doc(db, 'tasks', id)
  try{
    await deleteDoc(taskDocRef)
  } catch (err) {
    alert(err)
  }
}

// useEffect(() => {
//   const q = query(collection(db, 'tasks'), orderBy('created', 'desc'))
//   onSnapshot(q, (querySnapshot) => {
//     setTasks(querySnapshot.docs.map(doc => ({
//       id: doc.id,
//       data: doc.data()
//     })))
//   })
// },[])







// import firebase from "firebase/app";  // include the Firebase module
// import "firebase/firestore"; // access firestore database service

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_API_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_API_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_API_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_API_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_API_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_API_FIREBASE_APP_ID,
// };
// // Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);

// export const db = app.firestore();
// export default app;



// import { storage } from "../firebase";

// const storageRef = storage.ref(); // access the default bucket

// // accepts file path in the format `folder/filename.ext`
// const getImageURL = async (filePath) => {
//   const url = await storageRef.child(filePath).getDownloadURL();
//   return url;
// };