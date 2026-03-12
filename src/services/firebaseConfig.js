import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQAGKwlNQWPMbHTMOTFKfIII-0Xg0jHpc",
  authDomain: "click-n-collect-f1da2.firebaseapp.com",
  projectId: "click-n-collect-f1da2",
  storageBucket: "click-n-collect-f1da2.firebasestorage.app",
  messagingSenderId: "579320919232",
  appId: "1:579320919232:web:db02d1e7f075f42b6ca925"
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const database = getDatabase(app);
export const db = getFirestore(app);

export default app;