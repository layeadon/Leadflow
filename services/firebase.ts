
// Use standard modular imports for Firebase v9+ to ensure named exports are correctly recognized
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Replace with your actual Firebase config from the Firebase Console
export const firebaseConfig = {
  apiKey: "AIzaSyCKsusVThJ9_gTlFOxRYQiPB8Mx77YFDoM",
  authDomain: "leadflow-84e9c.firebaseapp.com",
  projectId: "leadflow-84e9c",
  storageBucket: "leadflow-84e9c.firebasestorage.app",
  messagingSenderId: "3730346996",
  appId: "1:3730346996:web:9f37a82256099ae32f1fa1"
};

// Logic to check if the user has provided real credentials
export const isFirebaseReady = () => {
  const isPlaceholder = firebaseConfig.apiKey === "AIzaSyCKsusVThJ9_gTlFOxRYQiPB8Mx77YFDoM";
  const isEmpty = !firebaseConfig.apiKey || firebaseConfig.apiKey.trim() === "";
  return !isPlaceholder && !isEmpty && firebaseConfig.apiKey.length > 10;
};

let app;
let db;

if (isFirebaseReady()) {
  try {
    // Check if any Firebase apps are already initialized to avoid "Duplicate App" errors in development
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
    console.log("LeadFlow: Cloud Persistence Enabled");
  } catch (error) {
    console.error("LeadFlow: Firebase Connection Error", error);
  }
} else {
  console.log("LeadFlow: Running in Local Mode (Storage Only).");
}

export { app, db };
