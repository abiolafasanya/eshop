import React, { useState, createContext, useEffect } from 'react';

export interface AuthContextProps {
  auth: Auth;
  setAuth: React.Dispatch<React.SetStateAction<Auth>>;
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
    const localAuth = JSON.parse(localStorage.getItem(`auth`)) as Auth;
    return localAuth ? localAuth : { isLoggedIn: false, token: '', user: null };
  });

  useEffect(() => {
    setAuth((auth) => {
      const localAuth = JSON.parse(localStorage.getItem(`auth`)) as Auth;
      return localAuth ? localAuth : auth;
    });
  }, []);

  const handleSetAuth = (auth: Auth) => {
    const prev = JSON.parse(localStorage.getItem('auth'));
    if (prev) {
      localStorage.removeItem('auth');
    }
    localStorage.setItem('auth', JSON.stringify(auth));
    setAuth(auth);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth');
    setAuth({ isLoggedIn: false, token: '', user: null });
  };

  return (
    <AuthContext.Provider
      value={{ auth, handleSetAuth, setAuth, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
