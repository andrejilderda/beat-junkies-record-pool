import React from 'react';
import { ThemeProvider } from 'styled-components';
import { useMantineTheme } from '@mantine/styles';
import CustomProperties from '../components/CustomProperties';

interface ThemeContextProps {
  children: React.ReactNode;
}

const ThemeContext = ({ children }: ThemeContextProps) => {
  const mantineTheme = useMantineTheme();

  return (
    <ThemeProvider theme={mantineTheme}>
      <CustomProperties />
      {children}
    </ThemeProvider>
  );
};

export default ThemeContext;
