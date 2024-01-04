import React, { useContext } from 'react';
import { View, Text, Switch, Image } from 'react-native';
import { ThemeContext } from '../config/themeContext'; // Import ThemeContext

const SettingsPage = () => {
  const { theme, toggleTheme, isDark } = useContext(ThemeContext); // Access theme, toggleTheme, and isDark

  return (
    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: theme.background }}>
      {/* Profile Section */}
      <View style={{ alignItems: 'center', marginTop: 50 }}>
        <Image source={require('../assets/vives.png')} style={{ width: 100, height: 100, borderRadius: 50 }} />
        <Text style={{ color: theme.text, fontSize: 22, marginTop: 10 }}>Anonymous</Text>
        <Text style={{ color: theme.text, fontStyle: 'italic' }}>User profiles coming soon...</Text>
      </View>

      {/* App Settings Section */}
      <View style={{ marginTop: 50, width: '100%', paddingHorizontal: 20 }}>
        <Text style={{ color: theme.text, fontSize: 18, marginBottom: 10 }}>App Settings</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomColor: theme.border, borderBottomWidth: 1 }}>
          <Text style={{ color: theme.text }}>Theme (Dark / Light)</Text>
          {/* Toggle Switch */}
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isDark ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={toggleTheme}
            value={isDark}
          />
        </View>
      </View>
    </View>
  );
};

export default SettingsPage;
