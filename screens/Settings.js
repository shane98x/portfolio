import React, { useContext } from 'react';
import { View, Text, Switch, Image, StyleSheet } from 'react-native';
import { ThemeContext } from '../config/themeContext'; 

const SettingsPage = () => {
  const { theme, toggleTheme, isDark } = useContext(ThemeContext); 

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image source={require('../assets/vives.png')} style={styles.profileImage} />
        <Text style={[styles.username, { color: theme.text }]}>Anonymous</Text>
        <Text style={[styles.userStatus, { color: theme.text }]}>User profiles coming soon...</Text>
      </View>

      {/* App Settings Section */}
      <View style={styles.settingsSection}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Device</Text>
        <View style={[styles.themeToggleRow, { borderBottomColor: theme.itemBorder }]}>
          <Text style={{ color: theme.text }}>{`Theme ( ${isDark ? 'Dark' : 'Light'} )`}</Text> 
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 50,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {
    fontSize: 22,
    marginTop: 10,
  },
  userStatus: {
    fontStyle: 'italic',
  },
  settingsSection: {
    marginTop: 50,
    width: '100%',
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  themeToggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
});

export default SettingsPage;
