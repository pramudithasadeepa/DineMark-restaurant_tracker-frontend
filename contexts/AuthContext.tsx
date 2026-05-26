'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { 
  auth, 
  signInWithGoogle, 
  signInWithEmail, 
  signUpWithEmail,
  signOutUser,
  onAuthStateChanged,
  FirebaseUser
} from '@/lib/firebaseClient';
import api from '@/lib/api';

interface AppUser {
  id: string;
  email: string;
  name: string;
  image?: string;
  provider: string;
}

interface AuthContextType {
  user: AppUser | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  const syncUserWithBackend = async (firebaseUser: FirebaseUser, endpoint: string) => {
    try {
      const idToken = await firebaseUser.getIdToken();
      // Because we already updated our interceptor, api.post will automatically attach the token.
      // But for login/signup endpoints we might want to send it in the body as designed in authController.ts.
      const response = await api.post(endpoint, { idToken });
      
      setUser(response.data.user);
    } catch (error) {
      console.error('Failed to sync user with backend:', error);
      setUser(null);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      // The interceptor automatically attaches the Firebase ID token
      const response = await api.get('/auth/me');
      setUser(response.data.user);
    } catch (error: any) {
      if (error?.response?.status === 401) {
        // If backend returns 401 (e.g. user not in DB after a reset), clear Firebase session
        console.warn('Backend rejected session, signing out of Firebase...');
        await signOutUser();
      } else {
        console.error('Failed to fetch current user:', error);
      }
      setUser(null);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setFirebaseUser(firebaseUser);
      
      if (firebaseUser) {
        // Just fetch the current user profile from DB on reload
        await fetchCurrentUser();
      } else {
        setUser(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    const fbUser = await signInWithGoogle();
    await syncUserWithBackend(fbUser, '/auth/google');
  };

  const loginWithEmail = async (email: string, password: string) => {
    const fbUser = await signInWithEmail(email, password);
    await syncUserWithBackend(fbUser, '/auth/signin');
  };

  const registerWithEmail = async (email: string, password: string, name: string) => {
    const fbUser = await signUpWithEmail(email, password);
    // Since Firebase doesn't take name on basic email signup directly easily via client SDK,
    // we can update it in Firebase or pass it to backend. We'll pass it to backend in our sync.
    try {
      const idToken = await fbUser.getIdToken();
      const response = await api.post('/auth/signup', { idToken, name });
      setUser(response.data.user);
    } catch (error) {
      console.error('Failed to register user with backend:', error);
      throw error;
    }
  };

  const logout = async () => {
    await signOutUser();
    await api.post('/auth/logout');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      firebaseUser,
      loading,
      loginWithGoogle,
      loginWithEmail,
      registerWithEmail,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
