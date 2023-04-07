import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWzh5ew3EpgvgRrFRFaTkYScOrtMKWMUM",
  authDomain: "cart-ad8be.firebaseapp.com",
  projectId: "cart-ad8be",
  storageBucket: "cart-ad8be.appspot.com",
  messagingSenderId: "781049392712",
  appId: "1:781049392712:web:d281bfc25a19e70696727d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
