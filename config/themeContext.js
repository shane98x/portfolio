import React, { createContext, useState } from 'react';
import { lightTheme } from '../themes/light';
import { darkTheme } from '../themes/dark';

export const ThemeContext = createContext({
  isDark: false,
  theme: lightTheme, 
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false); 

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ isDark, theme: isDark ? darkTheme : lightTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};