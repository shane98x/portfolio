// FavoriteList.js
import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ThemeContext } from '../config/themeContext'; // Import ThemeContext

const FavoriteList = ({ favorites, onFavoriteRemoved, navigation }) => {
    const { theme } = useContext(ThemeContext); // Access the theme from the context

    const handleNavigateToDetails = (item) => {
        navigation.navigate('Details', { id: item.id }); // Navigate to the Details screen with token id
    };

    const handleRemoveFavorite = async (item) => {
        await onFavoriteRemoved(item);
    };

    const renderFavoriteItem = ({ item }) => (
        <View style={[styles.item, { borderBottomColor: theme.itemBorder }]}>
            <TouchableOpacity onPress={() => handleNavigateToDetails(item)} style={styles.tokenInfo}>
                <Text style={[styles.text, { color: theme.text }]}>{`${item.name} (${item.symbol.toUpperCase()})`}</Text> 
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRemoveFavorite(item)} style={styles.icon}>
                <Icon name="star" size={24} color={theme.tabBarActiveTint} />
            </TouchableOpacity>
        </View>
    );    

    return (
        <FlatList
            data={favorites}
            keyExtractor={(item, index) => item && item.id ? item.id.toString() : index.toString()}
            renderItem={renderFavoriteItem}
        />
    );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        // Removed color here as it's added dynamically
    },
    tokenInfo: {
        flex: 1, 
        justifyContent: 'flex-start', 
    },
    text: {
        fontSize: 18,
        // Removed color here as it's added dynamically
    },
    icon: {
        width: 44, 
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default FavoriteList;
