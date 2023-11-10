// Import necessary modules from Firebase
import firebase from 'firebase/compat/app';  // Import the Firebase app module
import 'firebase/compat/auth';              // Import the Firebase authentication module
import 'firebase/compat/firestore';         // Import the Firebase Firestore module

// Firebase configuration object with API key and project settings
const firebaseConfig = {
    apiKey: "AIzaSyCpFp_lBVVs3qu8qj2k14R6GPfI8D_bZT0",
    authDomain: "iudelivery.firebaseapp.com",
    projectId: "iudelivery",
    storageBucket: "iudelivery.appspot.com",
    messagingSenderId: "812414741337",
    appId: "1:812414741337:web:d4fc495531eb8a3715fa48",
    measurementId: "G-P6EFX4GF08"
};

// Check if there are no existing Firebase apps initialized
if (!firebase.apps.length) {
    // Initialize the Firebase app with the provided configuration
    firebase.initializeApp(firebaseConfig);
}

// Export the initialized Firebase app for use in the application
export { firebase };
