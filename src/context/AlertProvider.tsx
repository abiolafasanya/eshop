import React, { useState, createContext } from 'react';
import { PropTypes } from '../types';

const AlertContext = createContext<PropTypes>({});

export const AlertProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
      const [alert, setAlert] = useState({});
      return (
        <AlertContext.Provider value={{ alert, setAlert }}>
          {children}
        </AlertContext.Provider>
      );
    };

export default AlertContext
