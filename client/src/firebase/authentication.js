import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "./config";

const auth = getAuth(app);

// registration using email and password
export const registerUser = async ({ email, password, imageUrl, fullName }) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // eslint-disable-next-line no-unused-vars
    const updateResponse = await updateProfile(auth.currentUser, {
      displayName: fullName,
      photoURL: imageUrl,
    });

    return response.user;
  } catch (error) {
    return error.message;
  }
};

//normal sign in from form submission
export const signIn = async ({ email, password }) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return response.user;
  } catch (error) {
    return error.message;
  }
};

// sign in with google
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const response = await signInWithPopup(auth, googleProvider);
    return response.user;
  } catch (error) {
    return error.message;
  }
};

// sign out

export const userSignOut = async () => {
  try {
    localStorage.removeItem("authToken");
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
};
