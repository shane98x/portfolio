import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ThemeContext } from '../config/themeContext'; 
import { useTranslation } from 'react-i18next'; 

const FavoriteList = ({ favorites, onFavoriteRemoved, navigation }) => {
    const { theme } = useContext(ThemeContext);
    const { t } = useTranslation(); // Initialize translation function

    const handleNavigateToDetails = (item) => {
        navigation.navigate('Details', { id: item.id });
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
        <View>
            <FlatList
                data={favorites}
                keyExtractor={(item, index) => item && item.id ? item.id.toString() : index.toString()}
                renderItem={renderFavoriteItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
    },
    tokenInfo: {
        flex: 1, 
        justifyContent: 'flex-start', 
    },
    text: {
        fontSize: 18,
    },
    icon: {
        width: 44, 
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        padding: 20,
    },
});

export default FavoriteList;
