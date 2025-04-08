import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import TopBar from "./components/TopBar";

// Firebase config from .env
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function App() {
  const [user, setUser] = useState(null);

  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  const logout = () => {
    signOut(auth);
    setUser(null);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <TopBar />
      <div className="flex flex-col items-center justify-center h-[90vh]">
        {!user ? (
          <>
            <h1 className="text-2xl mb-4">Login to Flashcard App</h1>
            <button
              onClick={login}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl"
            >
              Sign in with Google
            </button>
          </>
        ) : (
          <>
            <h1 className="text-2xl mb-2">Welcome, {user.displayName}!</h1>
            <p className="mb-4 text-gray-700">{user.email}</p>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded-xl"
            >
              Log out
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default App;
