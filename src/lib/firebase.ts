import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

export interface FirebaseConfigType {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId: string;
}

const LOCAL_STORAGE_KEY = 'kareem_custom_firebase_config';

export function getActiveFirebaseConfig(): FirebaseConfigType | null {
  // 1. Check if user configured in browser/dashboard settings
  try {
    const custom = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (custom) {
      const parsed = JSON.parse(custom);
      if (parsed.projectId && parsed.apiKey) {
        return parsed;
      }
    }
  } catch (e) {
    // ignore
  }

  // 2. Check Vite environment variables
  if (import.meta.env.VITE_FIREBASE_PROJECT_ID && import.meta.env.VITE_FIREBASE_API_KEY) {
    return {
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebasestorage.app`,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
      appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
    };
  }

  return null;
}

export function saveCustomFirebaseConfig(config: FirebaseConfigType): void {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(config));
  // Reload app to re-initialize Firebase
  window.location.reload();
}

export function clearCustomFirebaseConfig(): void {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
  window.location.reload();
}

let firebaseApp: FirebaseApp | null = null;
let firestoreDb: Firestore | null = null;

try {
  const config = getActiveFirebaseConfig();
  if (config) {
    if (!getApps().length) {
      firebaseApp = initializeApp(config);
    } else {
      firebaseApp = getApp();
    }
    firestoreDb = getFirestore(firebaseApp);
  }
} catch (error) {
  console.warn('[Firebase] Initialization skipped or error:', error);
}

export const db: Firestore | null = firestoreDb;
export const isFirebaseConfigured = (): boolean => Boolean(firestoreDb);
