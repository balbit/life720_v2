import { useTheme } from './ThemeContext';
import { getStyles } from './Styles';

export const useThemedStyles = () => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return styles;
};