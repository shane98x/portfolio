import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import FavoritesContext from '../config/favoritesContext'; 
import FavoriteList from '../components/FavoriteList'; 
import { useNavigation } from '@react-navigation/native';

const FavoritesPage = () => {
    const { favorites, removeFavorite } = useContext(FavoritesContext);
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <FavoriteList favorites={favorites} onFavoriteRemoved={removeFavorite} navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'flex-start' 
    }
});

export default FavoritesPage;
