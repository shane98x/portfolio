import React, { createContext, useState } from 'react';
import { lightTheme } from '../themes/light';
import { darkTheme } from '../themes/dark';

export const ThemeContext = createContext({
  isDark: false,
  theme: lightTheme, // Default to light theme
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false); // Keep track of the current theme

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ isDark, theme: isDark ? darkTheme : lightTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};