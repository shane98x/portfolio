import React, { useEffect, useState, useContext } from 'react';
import {
  ScrollView,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Modal,
  View,
} from 'react-native';
import FavoritesContext from '../config/favoritesContext';
import { ThemeContext } from '../config/themeContext';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

const TokenDetails = ({ id }) => {
    const { theme } = useContext(ThemeContext);
    const { addFavorite } = useContext(FavoritesContext);
    const { t } = useTranslation();
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const fetchToken = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}?localization=false`);
                const data = await response.json();
                if (response.ok) {
                    setToken(data);
                } else {
                    throw new Error(t('apiOffline')); 
                }
            } catch (error) {
                setErrorMessage(t('apiOffline')); 
                setErrorModalVisible(true);
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchToken();
    }, [id, t]);

    if (isLoading) {
        return <ActivityIndicator size="large" color={theme.activityIndicator} />;
    }

    if (errorModalVisible) {
        return (
            <Modal
                visible={errorModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => {
                    setErrorModalVisible(false);
                    navigation.navigate('Overview'); 
                }}
            >
                <View style={[styles.modalContainer, { backgroundColor: theme.modalBackground }]}>
                    <Text style={{ color: theme.text }}>{errorMessage}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            setErrorModalVisible(false);
                            navigation.navigate('Favourites'); 
                        }}
                        style={[styles.favoritesButton, { backgroundColor: theme.tabBarActiveTint }]} // Use the favoritesButton styling
                    >
                        <Text style={styles.favoritesButtonText}>{t('close')}</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        );
    }

    if (!token) {
        return (
            <View style={[styles.container, { backgroundColor: theme.background }]}>
                <Text style={{ color: theme.text }}>{t('noResults')}</Text>
            </View>
        );
    }

    const formatValue = (value, isNumeric = false) => {
        if (value === null || value === undefined) {
            return isNumeric ? '0.00000' : t('noInfo');
        }
        return isNumeric ? value.toFixed(5) : value;
    };

    const addToFavorites = async () => {
        try {
            const tokenToSave = { id: token.id, name: token.name, symbol: token.symbol };
            addFavorite(tokenToSave); // Use addFavorite from context
        } catch (error) {
            console.error(error);
        }
    };

    const navigateToChart = () => {
        navigation.navigate('Chart', { id: id });
    };
    
    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}>
            <Text style={[styles.name, { color: theme.text }]}>{token.name ? `${token.name} (${token.symbol.toUpperCase()})` : t('noInfo')}</Text>
            <Image source={token.image && token.image.large ? { uri: token.image.large } : require('../assets/not_found.png')} style={styles.image} />
            <Text style={[styles.currentPrice, { color: theme.text }]}>{`${t('currentPrice')}: €${formatValue(token.market_data.current_price.eur, true)}`}</Text>
            <Text style={[styles.marketCapRank, { color: theme.text }]}>{`${t('marketCapRank')}: ${formatValue(token.market_data.market_cap_rank)}`}</Text>
            <Text style={[styles.ath, { color: theme.text }]}>{`${t('allTimeHigh')}: €${formatValue(token.market_data.ath.eur, true)}`}</Text>
            <Text style={[styles.athPercentage, { color: theme.text }]}>{`${t('changeFromATH')}: ${formatValue(token.market_data.ath_change_percentage.eur, true)}%`}</Text>
            <Text style={[styles.atl, { color: theme.text }]}>{`${t('allTimeLow')}: €${formatValue(token.market_data.atl.eur, true)}`}</Text>
            <Text style={[styles.atlPercentage, { color: theme.text }]}>{`${t('changeFromATL')}: ${formatValue(token.market_data.atl_change_percentage.eur, true)}%`}</Text>
            
            <TouchableOpacity onPress={navigateToChart} style={[styles.chartButton, { backgroundColor: theme.tabBarActiveTint }]}>
                <Text style={styles.chartButtonText}>{t('viewChart')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={addToFavorites} style={[styles.favoritesButton, { backgroundColor: theme.tabBarActiveTint }]}>
                <Text style={styles.favoritesButtonText}>{t('addToFavorites')}</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
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
        margin: 5,
    },
    marketCapRank: {
        fontSize: 16,
        margin: 5,
    },
    ath: {
        fontSize: 16,
        margin: 5,
    },
    athPercentage: {
        fontSize: 16,
        margin: 5,
    },
    atl: {
        fontSize: 16,
        margin: 5,
    },
    atlPercentage: {
        fontSize: 16,
        margin: 5,
    },
    favoritesButton: {
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    favoritesButtonText: {
        color: 'white',
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chartButton: {
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    chartButtonText: {
        color: 'white',
        textAlign: 'center',
    }
});

export default TokenDetails;
