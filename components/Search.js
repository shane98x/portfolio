import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  FlatList,
  Modal,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const Search = () => {
    const navigation = useNavigation();
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
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={query}
                onChangeText={text => setQuery(text)}
                placeholder="Search token name"
            />
            <Button title="Search" onPress={handleSearch} />

            {showWelcome && (
                <Text style={styles.welcomeText}>Welcome! Start by searching for a token name.</Text>
            )}

            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : noResults ? (
                <Text style={styles.noResultsText}>No results found. Try a different search.</Text>
            ) : (
                <FlatList
                    style={styles.list}
                    data={results}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleItemPress(item.id)}>
                            <View style={styles.itemContainer}>
                                <Image source={{ uri: item.thumb }} style={styles.itemImage} />
                                <View>
                                    <Text style={styles.itemName}>{`${item.name} (${item.symbol.toUpperCase()})`}</Text>
                                    <Text>Market Cap Rank: {item.market_cap_rank}</Text>
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
                <View style={styles.modalContainer}>
                    <Text>API is currently offline. Please try again later.</Text>
                    <Button title="Close" onPress={() => setErrorModalVisible(false)} />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        borderColor: 'gray',
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
        borderBottomColor: '#ccc',
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
        backgroundColor: '#fff',
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
});

export default Search;
