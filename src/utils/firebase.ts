// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyDGxqNXb1aHoQDV3Y_FauUyHnyDJJ-uAvY",
  authDomain: "simple-toolbox.firebaseapp.com",
  projectId: "simple-toolbox",
  storageBucket: "simple-toolbox.appspot.com",
  messagingSenderId: "1056136676092",
  appId: "1:1056136676092:web:4579c7ac62a2db987c4d79",
  measurementId: "G-QPGRM05J30"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase