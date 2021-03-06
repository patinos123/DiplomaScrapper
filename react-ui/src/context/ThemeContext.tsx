import React from 'react';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import { themeMode } from '../theme/mainTheme';
import { ThemeState } from './ThemeContext.types';

const defaultContextData = {
  dark: false,
  toggle: (value: boolean) => {
    //
  },
};

const ThemeContext = React.createContext(defaultContextData);
const useTheme = () => React.useContext(ThemeContext);

const useEffectDarkMode = () => {
  const [themeState, setThemeState] = React.useState<ThemeState>({
    dark: false,
    hasThemeMounted: false,
  });
  React.useEffect(() => {
    const lsDark = localStorage.getItem('dark') === 'true';
    setThemeState({ ...themeState, dark: lsDark, hasThemeMounted: true });
    // eslint-disable-next-line
  }, []);

  return { themeState, setThemeState };
};

const ThemeProvider: React.FC = ({ children }) => {
  const { themeState, setThemeState } = useEffectDarkMode();

  if (!themeState.hasThemeMounted) {
    return <div />;
  }

  const toggle = (value: boolean) => {
    const dark = value;
    localStorage.setItem('dark', JSON.stringify(dark));
    setThemeState({ ...themeState, dark });
  };

  const computedTheme = themeState.dark ? themeMode('dark') : themeMode('light');

  return (
    <EmotionThemeProvider theme={computedTheme}>
      <ThemeContext.Provider
        value={{
          dark: themeState.dark,
          toggle,
        }}
      >
        {children}
      </ThemeContext.Provider>
    </EmotionThemeProvider>
  );
};

export { ThemeProvider, useTheme };
