import React, { ReactNode, useState } from 'react';
import {
  ColorScheme,
  ColorSchemeProvider,
  GlobalStyles,
  MantineProvider,
} from '@mantine/styles';

interface ThemeContextProps {
  children: ReactNode;
}

const ThemeContext = ({ children }: ThemeContextProps) => {
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
          colors: {
            gray: [
              '#FAFAFA',
              '#F4F4F5',
              '#E4E4E7',
              '#D4D4D8',
              '#A1A1AA',
              '#71717A',
              '#52525B',
              '#3F3F46',
              '#27272A',
              '#18181B',
            ],
            dark: [
              '#FAFAFA',
              '#F4F4F5',
              '#E4E4E7',
              '#D4D4D8',
              '#A1A1AA',
              '#71717A',
              '#52525B',
              '#18181B',
              '#27272A',
              '#3F3F46',
            ],
          },
        }}
      >
        <GlobalStyles />
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default ThemeContext;
