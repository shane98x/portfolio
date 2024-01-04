import React from 'react';
import AppNavigator from './config/Navigator';
import { FavoritesProvider } from './config/favoritesContext';


export default function App() {
  return (
    <FavoritesProvider>
      <AppNavigator />
    </FavoritesProvider>
  );
}


