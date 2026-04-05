// ─── FIREBASE CONFIGURATION ──────────────────────────────────────────────────
//
// SETUP INSTRUCTIONS:
// 1. Go to https://console.firebase.google.com
// 2. Click "Create a project" (or "Add project")
// 3. Name it something like "series65-study"
// 4. Disable Google Analytics (not needed) → Create Project
// 5. Once created, click the web icon </> to add a web app
// 6. Register the app (any nickname), skip hosting
// 7. Copy the firebaseConfig object and paste it below
// 8. Then follow the Firestore & Auth steps in SETUP.md
//

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ⚠️  REPLACE THIS with your own Firebase config from the Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyAYdYbaM78gmqsraHbj6ghUAbdpiQpMV0Q",
  authDomain: "series65-study.firebaseapp.com",
  projectId: "series65-study",
  storageBucket: "series65-study.firebasestorage.app",
  messagingSenderId: "428602029408",
  appId: "1:428602029408:web:8d7f520877eb4463d7da05"
};

// Check if Firebase is configured
export const isFirebaseConfigured =
  firebaseConfig.apiKey !== "AIzaSyAYdYbaM78gmqsraHbj6ghUAbdpiQpMV0Q";

let app = null;
let auth = null;
let db = null;
let googleProvider = null;

if (isFirebaseConfigured) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  googleProvider = new GoogleAuthProvider();
}

export { app, auth, db, googleProvider };
