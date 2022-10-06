import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAXnEwJIPKn1zqo7YvabIEj7dzXsjvsKM0",
  authDomain: "simply-text-ai.firebaseapp.com",
  projectId: "simply-text-ai",
  storageBucket: "simply-text-ai.appspot.com",
  messagingSenderId: "1019093422214",
  appId: "1:1019093422214:web:30f3c3b563e09a88830107",
  measurementId: "G-R9D0JZ1VEE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);