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
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "123456789",
  appId: "YOUR_APP_ID",
};

// Check if Firebase is configured
export const isFirebaseConfigured =
  firebaseConfig.apiKey !== "YOUR_API_KEY_HERE";

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
