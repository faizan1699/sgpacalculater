
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCgsrR8uo4adxBuJy0uS-v5_OIvQBJIZfs",
  authDomain: "firbase-crud-eb53a.firebaseapp.com",
  databaseURL: "https://firbase-crud-eb53a-default-rtdb.firebaseio.com",
  projectId: "firbase-crud-eb53a",
  storageBucket: "firbase-crud-eb53a.appspot.com",
  messagingSenderId: "279295474169",
  appId: "1:279295474169:web:f525ad4471cba6f0be6528"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
