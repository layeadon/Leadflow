import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Replace placeholders with your actual Firebase Web Config
export const firebaseConfig = {
  apiKey: "AIzaSyCKsusVThJ9_gTlFOxRYQiPB8Mx77YFDoM",
  authDomain: "leadflow-84e9c.firebaseapp.com",
  projectId: "leadflow-84e9c",
  storageBucket: "leadflow-84e9c.firebasestorage.app",
  messagingSenderId: "3730346996",
  appId: "1:3730346996:web:9f37a82256099ae32f1fa1"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
