import React, {useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Search from '../components/Search'; 
import { ThemeContext } from '../config/themeContext';

const OverviewPage = () => {
  const { theme } = useContext(ThemeContext); // Access the theme from the context

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Search /> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default OverviewPage;
