import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import {
  addDoc,
  collection,
  getFirestore
} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBIENEMI9cWctX1cRW4cl19uXtVEZqI-wk",
  authDomain: "netflix-clon-733a2.firebaseapp.com",
  projectId: "netflix-clon-733a2",
  storageBucket: "netflix-clon-733a2.firebasestorage.app",
  messagingSenderId: "398758585546",
  appId: "1:398758585546:web:5f18a9eea4a8fbba0e0033",
  measurementId: "G-RSBCPE3Q3M"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email
    });

    toast.success("Signup successful!");
  } catch (error) {
    console.error("Signup error:", error);
    const code = error.code.split("/")[1] || "unknown-error";
    toast.error(code.replace(/-/g, " "));
  }
};


const login = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    console.log("Logged in:", res.user.email);
    toast.success("Login successful!"); 
  } catch (error) {
    console.error("Login error:", error);
    const code = error.code.split("/")[1] || "invalid-credentials";
    if (code === "invalid-credential" || code === "INVALID_LOGIN_CREDENTIALS") {
      toast.error("Email or password is incorrect");
    } else {
      toast.error(code.replace(/-/g, " "));
    }
  }
};


const logout = async () => {
  try {
    await signOut(auth);
    toast.success("Logout successful!");
  } catch (error) {
    console.error("Logout error:", error);
    toast.error("Logout error: " + (error.message || ""));
  }
};

export { auth, db, signup, login, logout };
