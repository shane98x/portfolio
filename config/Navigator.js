import React, {useContext} from 'react';
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
import { darkTheme } from '../themes/dark';

import { useTranslation } from 'react-i18next';

// Create Stack Navigator for each tab
const Stack = createStackNavigator();

function OverviewStackScreen() {
  const { t } = useTranslation();  

  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Overview" component={OverviewPage} options={{ title: t('overview') }} />
      <Stack.Screen name="Details" component={DetailsPage} options={{ title: t('details') }} />
    </Stack.Navigator>
  );
}

function SettingsStackScreen() {
  const { t } = useTranslation();  

  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Settings" component={SettingsPage} options={{ title: t('settings') }} />
    </Stack.Navigator>
  );
}

function FavouritesStackScreen() {
  const { t } = useTranslation();  

  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Favourites" component={FavoritesPage} options={{ title: t('favorites') }} />
      <Stack.Screen name="Details" component={DetailsPage} options={{ title: t('details') }} />
    </Stack.Navigator>
  );
}

// Create the tab navigation
const Tab = createBottomTabNavigator();

function TabNavigator() {
  const { theme } = useContext(ThemeContext); 
  const { t } = useTranslation(); 

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
        tabBarLabel: t(route.name.toLowerCase()), 
        tabBarActiveTintColor: theme.tabBarActiveTint,
        tabBarInactiveTintColor: theme.tabBarInactiveTint,
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
  const { theme } = useContext(ThemeContext); 

  return (
    <NavigationContainer theme={{
      dark: theme.background === darkTheme.background,
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