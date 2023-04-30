import React, { useState, useEffect, createContext } from 'react';

type AppTypes = {
  toggleTheme: () => void;
  dark: boolean;
  openMenu: boolean;
  toggleMenu: () => void;
};

interface AppProviderProps {
  children: React.ReactNode;
}

const AppContext = createContext({} as AppTypes);

export const AppProvider = ({ children }: AppProviderProps) => {
  const [dark, setDark] = useState<boolean>(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme ? JSON.parse(storedTheme) : true;
  });

  const [openMenu, setOpenMenu] = useState<boolean>(false)

  const toggleMenu  = () => {
    setOpenMenu(menu => !menu)
  }

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(dark));
  }, [dark]);

  const toggleTheme = () => {
    setDark(prevDark => !prevDark);
  };

  return (
    <AppContext.Provider value={{ dark, toggleTheme, openMenu, toggleMenu }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
