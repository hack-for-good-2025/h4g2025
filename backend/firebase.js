const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyD-yze7MCo9kAV6U-VTjCUgHYR__wI6N6I",
  authDomain: "hack4good-a328e.firebaseapp.com",
  projectId: "hack4good-a328e",
  storageBucket: "hack4good-a328e.firebasestorage.app",
  messagingSenderId: "428847008658",
  appId: "1:428847008658:web:1e14d80c3bcc48d90acf4b",
  measurementId: "G-C9CYGYEMDB"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = { db }
