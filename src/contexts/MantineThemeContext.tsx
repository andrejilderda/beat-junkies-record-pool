import React, { ReactNode, useState } from 'react';
import {
  ColorScheme,
  ColorSchemeProvider,
  GlobalStyles as GlobalMantineStyles,
  MantineProvider,
} from '@mantine/styles';
import getColorOverrides from './colorOverrides';

interface ThemeContextProps {
  children: ReactNode;
}

const MantineThemeContext = ({ children }: ThemeContextProps) => {
  const [colorScheme, setColorScheme] = useState<'dark' | 'light'>('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          colorScheme,
          colors: getColorOverrides(colorScheme),
          primaryColor: 'green',
          fontFamily: "'Plus Jakarta Sans', sans-serif;",
        }}
      >
        <div data-theme={colorScheme}>
          <GlobalMantineStyles />
          {children}
        </div>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default MantineThemeContext;
