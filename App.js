// App.js
import React from 'react';
import { ThemeProvider } from '../portfolio/config/themeContext'; 
import AppNavigator from './config/Navigator';
import { FavoritesProvider } from './config/favoritesContext';
import '../portfolio/config/i18n'; 

export default function App() {
  return (
    <ThemeProvider> 
      <FavoritesProvider>
        <AppNavigator />
      </FavoritesProvider>
    </ThemeProvider>
  );
}
