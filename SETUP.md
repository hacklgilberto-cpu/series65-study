# Series 65 Study Companion — Setup Guide

## Quick Start (5 minutes — works without Firebase)

Even without Firebase, the app works perfectly with **localStorage** (notes save per-device).

```bash
# 1. Install dependencies
npm install

# 2. Run locally
npm run dev

# 3. Open http://localhost:5173/series65-study/
```

---

## Deploy to GitHub Pages (10 minutes)

### Step 1: Create a GitHub repo

1. Go to https://github.com/new
2. Name it `series65-study` (must match the `base` in `vite.config.js`)
3. Set it to **Public** (required for free GitHub Pages)
4. Don't add a README (you already have files)

### Step 2: Push your code

```bash
cd series65-study
git init
git add .
git commit -m "Initial commit — Series 65 Study Companion"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/series65-study.git
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repo on GitHub → **Settings** → **Pages**
2. Under "Build and deployment", set Source to **GitHub Actions**
3. The deploy workflow will run automatically on your next push
4. After ~2 minutes, your site will be live at:
   **`https://YOUR_USERNAME.github.io/series65-study/`**

---

## Add Firebase for Cross-Device Notes (15 minutes)

This lets you sign in with Google and sync notes across your phone, laptop, tablet, etc.

### Step 1: Create a Firebase project

1. Go to https://console.firebase.google.com
2. Click **"Create a project"** (or "Add project")
3. Name it `series65-study`
4. **Disable** Google Analytics (not needed) → **Create Project**
5. Wait for it to finish, then click **Continue**

### Step 2: Add a web app

1. On the project overview page, click the **web icon** `</>`
2. Register the app with nickname `series65-study`
3. **Skip** the "Firebase Hosting" checkbox
4. Click **Register app**
5. You'll see a `firebaseConfig` object — **copy it**

### Step 3: Paste your config

Open `src/firebase.js` and replace the placeholder config:

```js
const firebaseConfig = {
  apiKey: "AIzaSy...",            // ← paste your values
  authDomain: "series65-study.firebaseapp.com",
  projectId: "series65-study",
  storageBucket: "series65-study.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123",
};
```

### Step 4: Enable Google Authentication

1. In Firebase Console → **Authentication** (left sidebar)
2. Click **Get started**
3. Click **Google** in the provider list
4. Toggle **Enable**
5. Set a project support email (your email)
6. Click **Save**

### Step 5: Create the Firestore database

1. In Firebase Console → **Firestore Database** (left sidebar)
2. Click **Create database**
3. Choose a location (e.g., `us-east1` or whatever is closest)
4. Start in **test mode** (we'll lock it down next)
5. Click **Create**

### Step 6: Set Firestore security rules

1. In Firestore → **Rules** tab
2. Replace the default rules with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. Click **Publish**

This means: each user can only read/write their own notes document.

### Step 7: Add your GitHub Pages domain to Firebase

1. In Firebase Console → **Authentication** → **Settings** tab
2. Under **Authorized domains**, click **Add domain**
3. Add: `YOUR_USERNAME.github.io`

### Step 8: Deploy

```bash
git add .
git commit -m "Add Firebase config for cross-device notes"
git push
```

GitHub Actions will auto-deploy. After ~2 minutes, visit your site and click **"Sign in to sync"** in the header.

---

## How It Works

| Feature | Without Firebase | With Firebase |
|---------|-----------------|---------------|
| Notes | Saved in browser (per-device) | Synced across all devices |
| Sign-in | Not needed | Google account |
| Offline | Works fully | Works, syncs when back online |
| Cost | Free | Free (Firebase free tier) |

The app always saves to localStorage first, so it works offline. When Firebase is configured and you're signed in, it also saves to Firestore in the cloud. When you sign in on a new device, your notes download automatically.

---

## Troubleshooting

**"Sign in" button doesn't appear:**
→ Check that `src/firebase.js` has real values (not `YOUR_API_KEY_HERE`)

**Google sign-in popup is blocked:**
→ Allow popups for your GitHub Pages domain

**Notes don't sync:**
→ Check the browser console (F12) for Firebase errors
→ Make sure Firestore rules are set correctly (Step 6)
→ Make sure your GitHub Pages domain is authorized (Step 7)

**Build fails on GitHub:**
→ Check the Actions tab in your repo for error logs
→ Make sure `package-lock.json` exists (run `npm install` locally first)
