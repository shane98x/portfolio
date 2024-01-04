import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native'; 
import i18n from '../config/i18n'; 

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
        const isAlreadyFavorite = favorites.some(favorite => favorite.id === token.id);
        if (!isAlreadyFavorite) {
            const newFavorites = [...favorites, token];
            setFavorites(newFavorites);
            await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
            Alert.alert(i18n.t('addedToFavorites')); 
        } else {
            Alert.alert(i18n.t('alreadyInFavorites')); 
        }
    };

    const removeFavorite = async (token) => {
        const updatedFavorites = favorites.filter(favorite => favorite.id !== token.id);
        setFavorites(updatedFavorites);
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        Alert.alert(i18n.t('removedFromFavorites')); 
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export default FavoritesContext;
