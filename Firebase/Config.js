import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCpFp_lBVVs3qu8qj2k14R6GPfI8D_bZT0",
    authDomain: "iudelivery.firebaseapp.com",
    projectId: "iudelivery",
    storageBucket: "iudelivery.appspot.com",
    messagingSenderId: "812414741337",
    appId: "1:812414741337:web:d4fc495531eb8a3715fa48",
    measurementId: "G-P6EFX4GF08"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };