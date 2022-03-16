import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAztlP85WiDJe1Y1bKhIurgitEm_unKFSw",
  authDomain: "sistema-d86fc.firebaseapp.com",
  projectId: "sistema-d86fc",
  storageBucket: "sistema-d86fc.appspot.com",
  messagingSenderId: "1068513712291",
  appId: "1:1068513712291:web:c118a8ea57d5abaf4e0716",
  measurementId: "G-3CB7EFPRPN"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;