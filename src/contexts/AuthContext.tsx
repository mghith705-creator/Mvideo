import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import type { User } from '../data/mockData';

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved session
    const saved = localStorage.getItem('mvideo-user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        // ignore parse errors
      }
    }
    setIsLoading(false);
  }, []);

  const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    await delay(800);
    if (!email || !password) {
      throw new Error('Please enter email and password');
    }
    const demoUser: User = {
      id: 'u1',
      name: 'User',
      email,
      avatar: `https://i.pravatar.cc/150?u=${email}`,
      playlists: [],
      likedVideos: [],
      watchHistory: [],
    };
    setUser(demoUser);
    localStorage.setItem('mvideo-user', JSON.stringify(demoUser));
    setIsLoading(false);
  }, []);

  const signup = useCallback(
    async (name: string, email: string, password: string) => {
      setIsLoading(true);
      await delay(800);
      if (!name || !email || !password) {
        throw new Error('Please fill all fields');
      }
      const demoUser: User = {
        id: 'u1',
        name,
        email,
        avatar: `https://i.pravatar.cc/150?u=${email}`,
        playlists: [],
        likedVideos: [],
        watchHistory: [],
      };
      setUser(demoUser);
      localStorage.setItem('mvideo-user', JSON.stringify(demoUser));
      setIsLoading(false);
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('mvideo-user');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
        isLoading,
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
