import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Import your page components here
import OverviewPage from '../screens/Overview';
import FavoritesPage from '../screens/Favorites';
import SettingsPage from '../screens/Settings';
import DetailsPage from '../screens/Details';

import { ThemeContext } from '../config/themeContext';

// Create Stack Navigator for each tab
const Stack = createStackNavigator();

function OverviewStackScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Overview" component={OverviewPage} />
      <Stack.Screen name="Details" component={DetailsPage} />
    </Stack.Navigator>
  );
}

function SettingsStackScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Settings" component={SettingsPage} />
    </Stack.Navigator>
  );
}

function FavouritesStackScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Favourites" component={FavoritesPage} />
      <Stack.Screen name="Details" component={DetailsPage} />
    </Stack.Navigator>
  );
}

// Create the tab navigation
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Overview') {
            iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'ios-heart' : 'ios-heart-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-settings' : 'ios-settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Overview" component={OverviewStackScreen} />
      <Tab.Screen name="Favorites" component={FavouritesStackScreen} />
      <Tab.Screen name="Settings" component={SettingsStackScreen} />
    </Tab.Navigator>
  );
}

const AppNavigator = () => {
  const { theme } = useContext(ThemeContext); // Access the theme from the context

  return (
    <NavigationContainer theme={{
      dark: theme.background === '#333333',
      colors: {
        primary: theme.tabBarActiveTint,
        background: theme.background,
        card: theme.background,
        text: theme.text,
        border: theme.background,
        notification: theme.tabBarActiveTint,
      },
    }}>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
