import React, { useContext, useState } from 'react';
import { View, Text, Switch, Image, StyleSheet } from 'react-native';
import { ThemeContext } from '../config/themeContext'; 
import i18n from '../config/i18n';
import { useTranslation } from 'react-i18next'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsPage = () => {
  const { theme, toggleTheme, isDark } = useContext(ThemeContext); 
  const [language, setLanguage] = useState(i18n.language);
  const { t } = useTranslation(); 

  // Define consistent styling for switches
  const trackColors = { false: "#767577", true: theme.tabBarActiveTint };
  const thumbColor = isDark ? "#f5dd4b" : "#f4f3f4";

  const toggleLanguage = async () => {
    let newLanguage = language === 'en' ? 'nl' : 'en';
    await AsyncStorage.setItem('language', newLanguage);
    i18n.changeLanguage(newLanguage);
    setLanguage(newLanguage);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image source={require('../assets/vives.png')} style={styles.profileImage} />
        <Text style={[styles.username, { color: theme.text }]}>{t('anonymous')}</Text>
        <Text style={[styles.userStatus, { color: theme.text }]}>{t('userProfilesComingSoon')}</Text>
      </View>

      {/* App Settings Section */}
      <View style={styles.settingsSection}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>{t('deviceSettings')}</Text>

        {/* Theme Toggle */}
        <View style={[styles.toggleRow, { borderBottomColor: theme.itemBorder }]}>
          <Text style={{ color: theme.text }}>{`${t('themeSetting')} (${isDark ? t('dark') : t('light')})`}</Text> 
          <Switch
            trackColor={trackColors}
            thumbColor={thumbColor}
            onValueChange={toggleTheme}
            value={isDark}
          />
        </View>

        {/* Language Toggle */}
        <View style={[styles.toggleRow, { borderBottomColor: theme.itemBorder }]}>
          <Text style={{ color: theme.text }}>{`${t('languageSetting')} (${language === 'en' ? 'EN' : 'NL'})`}</Text> 
          <Switch
            trackColor={trackColors}
            thumbColor={thumbColor}
            onValueChange={toggleLanguage}
            value={language === 'nl'}
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
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
});

export default SettingsPage;
