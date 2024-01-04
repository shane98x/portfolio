// Details.js
import React from 'react';
import TokenDetails from '../components/TokenDetails';
import { View } from 'react-native';

const Details = ({ route }) => {
    const { id } = route.params;

    return (
        <View style={{ flex: 1 }}>
            <TokenDetails id={id} />
        </View>
    );
};

export default Details;
