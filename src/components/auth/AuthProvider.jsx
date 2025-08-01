
// src/components/auth/AuthProvider.jsx

import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth"; // <--- CORRECT: Import from the firebase library
import { auth } from '../../firebase/auth'; // <--- CORRECT: Go up two directories


const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}