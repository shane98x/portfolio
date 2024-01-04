import React, { useState, useContext } from 'react';
import {
  View,
  TextInput,
  Text,
  FlatList,
  Modal,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Button
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../config/themeContext';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

const Search = () => {
    const navigation = useNavigation();
    const { theme } = useContext(ThemeContext);
    const { t } = useTranslation();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showWelcome, setShowWelcome] = useState(true);
    const [noResults, setNoResults] = useState(false);

    const handleSearch = async () => {
        setIsLoading(true);
        setShowWelcome(false);
        setNoResults(false);
        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/search?query=${query}`);
            const data = await response.json();
            setResults(data.coins);
            if (data.coins.length === 0) {
                setNoResults(true);
            }
        } catch (error) {
            console.error(error);
            setErrorModalVisible(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleItemPress = (itemId) => {
        navigation.navigate('Details', { id: itemId });
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <TextInput
                style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.inputText, borderColor: theme.itemBorder }]}
                value={query}
                onChangeText={text => setQuery(text)}
                placeholder={t('searchTokenName')} 
                placeholderTextColor={theme.inputText}
            />
            <TouchableOpacity 
                onPress={handleSearch}
                style={[styles.searchButton, { backgroundColor: theme.tabBarActiveTint }]} 
            >
                <Text style={styles.searchButtonText}>{t('search')}</Text> 
            </TouchableOpacity>

            {showWelcome && (
                <Text style={[styles.welcomeText, { color: theme.text }]}>{t('welcomeMessage')}</Text> 
            )}

            {isLoading ? (
                <ActivityIndicator size="large" color={theme.activityIndicator} />
            ) : noResults ? (
                <Text style={[styles.noResultsText, { color: theme.text }]}>{t('noResults')}</Text> 
            ) : (
                <FlatList
                    style={styles.list}
                    data={results}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleItemPress(item.id)}>
                            <View style={[styles.itemContainer, { borderBottomColor: theme.itemBorder }]}>
                                <Image source={{ uri: item.thumb }} style={styles.itemImage} />
                                <View>
                                    <Text style={[styles.itemName, { color: theme.text }]}>{`${item.name} (${item.symbol.toUpperCase()})`}</Text>
                                    <Text style={{ color: theme.text }}>Market Cap Rank: {item.market_cap_rank}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}

            <Modal
                visible={errorModalVisible}
                onRequestClose={() => setErrorModalVisible(false)}
                animationType="slide"
            >
                <View style={[styles.modalContainer, { backgroundColor: theme.modalBackground }]}>
                    <Text style={{ color: theme.text }}>{t('apiOffline')}</Text> 
                    <Button title={t('close')} onPress={() => setErrorModalVisible(false)} color={theme.text} /> 
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    input: {
        height: 40,
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        width: width - 20,
    },
    list: {
        flexGrow: 1,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        width: width - 20,
    },
    itemImage: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    itemName: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 20,
    },
    noResultsText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
    searchButton: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 20,
        padding: 10,
    },
    searchButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});

export default Search;
