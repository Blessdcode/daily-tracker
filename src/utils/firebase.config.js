// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRkH71hkI9I8oCAd_iW-9k3It3pD7kiDU",
  authDomain: "expense-4199a.firebaseapp.com",
  databaseURL: "https://expense-4199a-default-rtdb.firebaseio.com",
  projectId: "expense-4199a",
  storageBucket: "expense-4199a.firebasestorage.app",
  messagingSenderId: "667702831079",
  appId: "1:667702831079:web:6d798f2acfdff8b450bf42",
  measurementId: "G-X3H1SW481W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error", error.message);
    }
  }
  return userDocRef;
};

export const createAUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const updateUserProfile = async (profileData) => {
  const user = auth.currentUser;

  if (user) {
    try {
      await updateProfile(user, profileData);
      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Error updating user profile", error);
    }
  } else {
    console.log("No user is currently signed in");
  }
};
