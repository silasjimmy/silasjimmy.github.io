// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCi5iEnHtvSXZDaLXdqSFjajhXKaUgCY9I",
  authDomain: "silasjimmy-portfolio.firebaseapp.com",
  projectId: "silasjimmy-portfolio",
  storageBucket: "silasjimmy-portfolio.appspot.com",
  messagingSenderId: "885984394655",
  appId: "1:885984394655:web:cfda50e19c14c0dcecd1aa",
  measurementId: "G-VZMVS8THZD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
