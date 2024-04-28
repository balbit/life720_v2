import { StyleSheet } from 'react-native';
import { lightTheme, darkTheme } from './Themes';

export const getStyles = (theme: 'light' | 'dark') => {
  const selectedTheme = theme === 'light' ? lightTheme : darkTheme;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: selectedTheme.backgroundColor,
      justifyContent: 'center', 
      alignItems: 'center'
    },
    titleText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: selectedTheme.textColor,
    },
    bodyText: {
      fontSize: 16,
      color: selectedTheme.textColor,
    },
    button: {
      backgroundColor: selectedTheme.primaryColor,
      margin: 20,
      padding: 0,
      borderRadius: 5,
    },
    buttonText: {
      color: selectedTheme.backgroundColor,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
};