// Details.js
import React, { useContext } from 'react';
import { View } from 'react-native';
import TokenDetails from '../components/TokenDetails';
import { ThemeContext } from '../config/themeContext'; 

const Details = ({ route }) => {
    const { theme } = useContext(ThemeContext); // Access the theme from the context
    const { id } = route.params;

    return (
        <View style={{ flex: 1, backgroundColor: theme.background }}>
            <TokenDetails id={id} />
        </View>
    );
};

export default Details;
