import React, { useState, createContext, useEffect } from 'react';

export interface AuthContextProps {
  auth: Auth;
  handleSetAuth: (auth: Auth) => void;
  handleLogout: () => void;
}

type Auth = {
  isLoggedIn: boolean;
  token?: string;
  user?: { id: string; email: string; username?: string };
};

const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [auth, setAuth] = useState(() => {
    const localAuthString = localStorage.getItem('auth');
    const localAuth = localAuthString
      ? (JSON.parse(localAuthString) as Auth)
      : { isLoggedIn: false, token: '', user: null };
    return localAuth as Auth;
  });

  useEffect(() => {
    setAuth((auth) => {
      const localAuthString = localStorage.getItem('auth');
      const localAuth = localAuthString
        ? (JSON.parse(localAuthString) as Auth)
        : auth;
      return localAuth;
    });
  }, []);

  const handleSetAuth = (auth: Auth) => {
    const localAuthString = localStorage.getItem('auth');
    const prev = localAuthString;
    if (prev) {
      localStorage.removeItem('auth');
    }
    localStorage.setItem('auth', JSON.stringify(auth));
    setAuth(auth);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth');
    setAuth({
      isLoggedIn: false,
      token: '',
      user: { email: '', id: '', username: '' },
    });
  };

  return (
    <AuthContext.Provider value={{ auth, handleSetAuth, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
