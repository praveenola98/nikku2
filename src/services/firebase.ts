import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDocFromServer,
  setDoc,
  collection,
  onSnapshot
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = firebaseConfig.firestoreDatabaseId 
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId) 
  : getFirestore(app);

// Google Auth Provider setup
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Test firestore connection
export async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firestore offline / check configuration');
    }
  }
}

// Trigger connection test
if (typeof window !== 'undefined') {
  testFirestoreConnection();
}

/**
 * Sign in using official Google popup
 */
export async function signInWithGoogleReal(): Promise<{
  email: string;
  name: string;
  photoUrl: string;
  uid: string;
} | null> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    if (user && user.email) {
      return {
        email: user.email,
        name: user.displayName || user.email.split('@')[0],
        photoUrl: user.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.displayName || user.email)}`,
        uid: user.uid
      };
    }
    return null;
  } catch (error: any) {
    console.error('Firebase Google Sign-In error:', error);
    throw error;
  }
}

/**
 * Sign out
 */
export async function signOutFirebase(): Promise<void> {
  try {
    await firebaseSignOut(auth);
  } catch (e) {
    console.error('Sign out error:', e);
  }
}

export { onAuthStateChanged };
export type { FirebaseUser };
