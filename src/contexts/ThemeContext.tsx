import React from 'react';
import { ThemeProvider } from 'styled-components';
import { useMantineTheme } from '@mantine/styles';
import GlobalStyles from './GlobalStyles';

interface ThemeContextProps {
  children: React.ReactNode;
}

const ThemeContext = ({ children }: ThemeContextProps) => {
  const mantineTheme = useMantineTheme();

  return (
    <ThemeProvider theme={mantineTheme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};

export default ThemeContext;
