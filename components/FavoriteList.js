import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const FavoriteList = ({ favorites, onFavoriteRemoved, navigation }) => {

    const handleNavigateToDetails = (item) => {
        navigation.navigate('Details', { id: item.id }); // Navigate to the Details screen with token id
    };

    const handleRemoveFavorite = async (item) => {
        await onFavoriteRemoved(item);
    };

    const renderFavoriteItem = ({ item }) => (
        <View style={styles.item}>
            <TouchableOpacity onPress={() => handleNavigateToDetails(item)} style={styles.tokenInfo}>
                <Text style={styles.text}>{`${item.name} (${item.symbol.toUpperCase()})`}</Text> 
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRemoveFavorite(item)} style={styles.icon}>
                <Icon name="star" size={24} color="#ffd700" />
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
        borderBottomColor: '#eee', 
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
});

export default FavoriteList;
