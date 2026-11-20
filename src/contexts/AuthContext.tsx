import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import {
  signUp,
  signIn,
  signOutUser,
  resetPassword,
  onAuthStateChange,
  createUserProfile,
  getUserProfile,
  type AuthUser,
  type UserProfile,
} from '../config/firebase';

type AuthContextType = {
  user: AuthUser | null;
  profile: UserProfile | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (authUser) => {
      setUser(authUser);
      if (authUser) {
        const userProfile = await getUserProfile(authUser.uid);
        setProfile(userProfile);
      } else {
        setProfile(null);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await signIn(email, password);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signup = useCallback(
    async (name: string, email: string, password: string) => {
      setIsLoading(true);
      try {
        const authUser = await signUp(email, password, name);
        await createUserProfile({
          uid: authUser.uid,
          name,
          email: authUser.email || email,
          playlists: [],
          likedVideos: [],
          watchHistory: [],
          createdAt: new Date().toISOString(),
        });
        setUser(authUser);
        const userProfile = await getUserProfile(authUser.uid);
        setProfile(userProfile);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(async () => {
    await signOutUser();
    setUser(null);
    setProfile(null);
  }, []);

  const updateProfileFn = useCallback(async (updates: Partial<UserProfile>) => {
    if (!user) throw new Error('No authenticated user');
    const { updateDoc, doc } = await import('firebase/firestore');
    const { getFirebaseDb } = await import('../config/firebase');
    await updateDoc(doc(getFirebaseDb(), 'users', user.uid), updates);
    const updatedProfile = await getUserProfile(user.uid);
    setProfile(updatedProfile);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        login,
        signup,
        logout,
        resetPassword,
        isAuthenticated: !!user,
        isLoading,
        updateProfile: updateProfileFn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
