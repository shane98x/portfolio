import React, { useEffect, useState, useContext } from 'react';
import { ScrollView, Text, Image, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import FavoritesContext from '../config/favoritesContext';

const TokenDetails = ({ id }) => {
    const [token, setToken] = useState(null);
    const { addFavorite } = useContext(FavoritesContext);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}?localization=false`);
                const data = await response.json();
                setToken(data);
            } catch (error) {
                console.error(error);
            }
        };

        if (id) {
            fetchToken();
        }
    }, [id]);

    if (!token) {
        return <ActivityIndicator size="large" style={styles.loader} />;
    }

    const formatValue = (value, isNumeric = false) => {
        if (value === null || value === undefined) {
            return isNumeric ? '0.00000' : 'No info';
        }
        return isNumeric ? value.toFixed(5) : value;
    };

    const addToFavorites = async () => {
        try {
            // Assuming the token object has an id, name, and symbol
            const tokenToSave = { id: token.id, name: token.name, symbol: token.symbol };
            addFavorite(tokenToSave); // Use addFavorite from context
        } catch (error) {
            console.error(error);
        }
    };
    
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.name}>{token.name ? `${token.name} (${token.symbol.toUpperCase()})` : 'No info'}</Text>
            <Image source={token.image && token.image.large ? { uri: token.image.large } : require('../assets/not_found.png')} style={styles.image} />
            <Text style={styles.currentPrice}>Current Price: €{formatValue(token.market_data.current_price.eur, true)}</Text>
            <Text style={styles.marketCapRank}>Market Cap Rank: {formatValue(token.market_data.market_cap_rank)}</Text>
            <Text style={styles.ath}>All-Time High (EUR): €{formatValue(token.market_data.ath.eur, true)}</Text>
            <Text style={styles.athPercentage}>% change from ATH: {formatValue(token.market_data.ath_change_percentage.eur, true)}%</Text>
            <Text style={styles.atl}>All-Time Low (EUR): €{formatValue(token.market_data.atl.eur, true)}</Text>
            <Text style={styles.atlPercentage}>% change from ATL: {formatValue(token.market_data.atl_change_percentage.eur, true)}%</Text>
            
            <TouchableOpacity onPress={addToFavorites} style={styles.favoritesButton}>
                <Text style={styles.favoritesButtonText}>Add to Favorites</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
        margin: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    currentPrice: {
        fontSize: 18,
        color: '#4caf50',
        margin: 5,
    },
    marketCapRank: {
        fontSize: 16,
        color: '#757575',
        margin: 5,
    },
    ath: {
        fontSize: 16,
        color: '#757575',
        margin: 5,
    },
    athPercentage: {
        fontSize: 16,
        color: '#757575',
        margin: 5,
    },
    atl: {
        fontSize: 16,
        color: '#757575',
        margin: 5,
    },
    atlPercentage: {
        fontSize: 16,
        color: '#757575',
        margin: 5,
    },
    favoritesButton: {
        padding: 10,
        backgroundColor: 'blue',
        borderRadius: 5,
    },
    favoritesButtonText: {
        color: 'white',
        textAlign: 'center',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default TokenDetails;
