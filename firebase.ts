// Mocking firebase modules because the environment lacks the correct types/packages
// Original configuration is preserved in comments for reference

/*
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC5hFB3ICxzyMrlvtnQl-n-2Dkr2RFsmqc",
  authDomain: "fir-9b1f8.firebaseapp.com",
  projectId: "fir-9b1f8",
  storageBucket: "fir-9b1f8.firebasestorage.app",
  messagingSenderId: "539772525700",
  appId: "1:539772525700:web:25b5a686877ddbf6d176d1",
  measurementId: "G-7FWY3QB5MY"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
*/

// --- MOCK IMPLEMENTATION ---

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

class MockAuth {
  currentUser: User | null = null;
  listeners: ((user: User | null) => void)[] = [];

  notify(user: User | null) {
    this.currentUser = user;
    this.listeners.forEach(l => l(user));
  }
}

export const auth = new MockAuth();
export const googleProvider = { providerId: 'google.com' };
export const db = {};

export const signInWithPopup = async (authInstance: any, provider: any) => {
  console.log("Mock SignInWithPopup");
  const mockUser: User = {
    uid: "mock-google-uid",
    email: "student@school.edu",
    displayName: "Mock Student",
    photoURL: null
  };
  (authInstance as MockAuth).notify(mockUser);
  return { user: mockUser };
};

export const signOut = async (authInstance: any) => {
  console.log("Mock SignOut");
  (authInstance as MockAuth).notify(null);
};

export const onAuthStateChanged = (authInstance: any, callback: (user: User | null) => void) => {
  const mockAuth = authInstance as MockAuth;
  mockAuth.listeners.push(callback);
  // Trigger initial state
  callback(mockAuth.currentUser);
  // Return unsubscribe
  return () => {
    mockAuth.listeners = mockAuth.listeners.filter(l => l !== callback);
  };
};
