import React, { createContext, useState, useContext, useEffect } from 'react';
import { login, logout } from '../services/authService';

interface User {
  id: string;
  username: string;
  email: string;
  roleId: string;
  verified_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

interface AuthContextProps {
  user: User | null;
  token: string;
  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: (token: string) => void;
}
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>('');

    useEffect(() => {
    // Load auth data from localStorage
    const savedToken = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('authUser');

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  
  const loginUser = async (email: string, password: string) => {
    const response = await login(email, password);
    if (response.data) {
      setUser(response.data.user);
      setToken(response.data.token);
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('authUser', JSON.stringify(response.data.user));
    }
  };

  const logoutUser = async (token: string) => {
    if (token) {
        await logout(token);
        setUser(null);
        setToken('');
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
