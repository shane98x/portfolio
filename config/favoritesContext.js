import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native'; 

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        try {
            const favoritesData = await AsyncStorage.getItem('favorites');
            setFavorites(favoritesData ? JSON.parse(favoritesData) : []);
        } catch (error) {
            console.error("Failed to load favorites: ", error);
        }
    };

    const addFavorite = async (token) => {
        // Check if the token already exists in favorites
        const isAlreadyFavorite = favorites.some(favorite => favorite.id === token.id);
        if (!isAlreadyFavorite) {
            const newFavorites = [...favorites, token];
            setFavorites(newFavorites);
            await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
            Alert.alert("Added to Favorites"); // Alert user of success
        } else {
            Alert.alert("Already in Favorites"); // Alert user that it's already a favorite
        }
    };

    const removeFavorite = async (token) => {
        const updatedFavorites = favorites.filter(favorite => favorite.id !== token.id);
        setFavorites(updatedFavorites); // Update local state
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        Alert.alert('Removed from Favorites'); // Optionally, alert user of removal
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export default FavoritesContext;
