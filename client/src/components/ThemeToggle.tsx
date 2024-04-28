import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@styles/ThemeContext';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const ThemeToggle = () => {
  const {theme, toggleTheme } = useTheme();

  return (
    <TouchableOpacity style={styles.toggleButton} onPress={toggleTheme}>
      <FontAwesomeIcon
        icon={theme === 'light' ? faSun: faMoon}
        size={26}
        color={theme === 'light' ? 'black' : 'white'}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toggleButton: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ThemeToggle;