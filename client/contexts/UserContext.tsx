import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  email: string;
  name: string;
  role: 'admin' | 'user';
  isAuthenticated: boolean;
}

interface UserContextType {
  user: User | null;
  login: (email: string, name: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: () => boolean;
  isAuthenticated: () => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Admin emails - in production this would come from database
const ADMIN_EMAILS = [
  'belenthiago516@gmail.com',
  'thiagobelent@icloud.com',
  'valentinab.2114@gmail.com',
  // Add more admin emails as needed
];

// Known user emails for demo purposes. In production, replace this with server-side verification.
const KNOWN_EMAILS = [
  ...ADMIN_EMAILS,
  'cliente@tutorialtechkids.com',
  'test@tutorialtechkids.com'
];

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('tutorialtech_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
    }
  }, []);

  const login = async (email: string, name: string): Promise<boolean> => {
    try {
      // In production, this would be an API call to verify credentials
      // For now, we'll simulate database lookup
      const isAdminEmail = ADMIN_EMAILS.includes(email.toLowerCase());
      
      const userData: User = {
        email: email.toLowerCase(),
        name,
        role: isAdminEmail ? 'admin' : 'user',
        isAuthenticated: true
      };

      setUser(userData);
      localStorage.setItem('tutorialtech_user', JSON.stringify(userData));
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tutorialtech_user');
  };

  const isAdmin = (): boolean => {
    return user?.role === 'admin' && user?.isAuthenticated === true;
  };

  const isAuthenticated = (): boolean => {
    return user?.isAuthenticated === true;
  };

  const value: UserContextType = {
    user,
    login,
    logout,
    isAdmin,
    isAuthenticated
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
