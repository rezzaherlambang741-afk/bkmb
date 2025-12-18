# Customer Service Website Deployment Guide

This guide covers the deployment of the Customer Service website using **GitHub**, **Netlify** (Frontend), and **Firebase** (Backend/Database).

## Prerequisites

1.  **Node.js** installed on your machine.
2.  **GitHub Account**.
3.  **Netlify Account**.
4.  **Firebase Account** (Google).

---

## Step 1: Firebase Setup (Backend)

1.  **Create Project:**
    *   Go to [Firebase Console](https://console.firebase.google.com/).
    *   Click "Add project" and name it (e.g., `cs-website-app`).
    *   Disable Google Analytics (optional).

2.  **Authentication:**
    *   Go to **Build > Authentication**.
    *   Click "Get Started".
    *   Enable **Email/Password** provider.
    *   Add your first admin user manually via the "Users" tab (e.g., `admin@example.com`).

3.  **Firestore Database:**
    *   Go to **Build > Firestore Database**.
    *   Click "Create Database".
    *   Choose a location (e.g., `asia-southeast2` for Jakarta).
    *   Start in **Test mode** (for development) or **Production mode** (recommended, but requires setting rules).

4.  **Get Configuration:**
    *   Go to Project Overview (Gear icon > Project settings).
    *   Scroll to "Your apps" and click the web icon (`</>`).
    *   Register the app (e.g., `cs-web`).
    *   **Copy the `firebaseConfig` object.** You will need the values inside it for Step 3.

---

## Step 2: GitHub Setup (Source Code)

1.  **Create Repository:**
    *   Go to GitHub and create a new repository.
2.  **Push Code:**
    *   Open your project terminal.
    *   Initialize git (if not already):
        ```bash
        git init
        git add .
        git commit -m "Initial commit"
        ```
    *   Link to remote:
        ```bash
        git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
        git branch -M main
        git push -u origin main
        ```

---

## Step 3: Netlify Setup (Frontend Hosting)

1.  **New Site:**
    *   Log in to Netlify.
    *   Click "Add new site" > "Import from Git".
    *   Choose **GitHub** and select your repository.

2.  **Build Settings:**
    *   **Base directory:** (Leave empty)
    *   **Build command:** `npm run build`
    *   **Publish directory:** `dist`

3.  **Environment Variables:**
    *   Click "Show advanced" or go to "Site settings > Environment variables" after creation.
    *   Add the following variables using the values from Step 1 (Firebase Config):
        *   `VITE_FIREBASE_API_KEY`: (Your apiKey)
        *   `VITE_FIREBASE_AUTH_DOMAIN`: (Your authDomain)
        *   `VITE_FIREBASE_PROJECT_ID`: (Your projectId)
        *   `VITE_FIREBASE_STORAGE_BUCKET`: (Your storageBucket)
        *   `VITE_FIREBASE_MESSAGING_SENDER_ID`: (Your messagingSenderId)
        *   `VITE_FIREBASE_APP_ID`: (Your appId)

4.  **Deploy:**
    *   Click "Deploy site".
    *   Wait for the build to finish. Netlify will give you a URL (e.g., `https://your-site.netlify.app`).

---

## Step 4: Final Configuration

1.  **Firebase Authorized Domains:**
    *   Go back to Firebase Console > Authentication > Settings > Authorized domains.
    *   Add your Netlify domain (e.g., `your-site.netlify.app`).

2.  **Switch to Real Data:**
    *   In your local code (or via ENV var), ensure `USE_MOCK` in `src/services/db.js` is controlled by an environment variable or set to `false` for production.
    *   (Note: The current code defaults `USE_MOCK = true`. You should add `VITE_USE_MOCK_DATA=false` to Netlify environment variables if you updated the code to check `import.meta.env.VITE_USE_MOCK_DATA`).

3.  **Security Rules (Firestore):**
    *   Update Firestore Rules to allow public read but admin-only write.
    ```
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        match /{document=**} {
          allow read: if true;
          allow write: if request.auth != null; // Only logged in admins
        }
      }
    }
    ```

---

## Security Notes

*   **Obfuscation:** The project includes a basic client-side protection script (disabling Right Click/F12). For code obfuscation, you can add `javascript-obfuscator` to the build pipeline if stricter measures are needed.
*   **Access Control:** Ensure only trusted people have the Admin login credentials.
