import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB6JzQ2AX05Q--GT4lgallbSMN7IUoEr2w",
  authDomain: "pantrypals-dad41.firebaseapp.com",
  projectId: "pantrypals-dad41",
  storageBucket: "pantrypals-dad41.appspot.com",
  messagingSenderId: "236115590806",
  appId: "1:236115590806:web:029324efe1628f3af10cb7",
  measurementId: "G-4F3DRW6GKQ"
};
firebase.initializeApp(firebaseConfig);
export default firebase;
