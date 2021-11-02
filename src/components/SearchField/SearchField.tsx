import React from 'react';
import 'styled-components/macro';
import { TextInput, TextInputProps } from '@mantine/core';
import { MagnifyingGlass } from 'phosphor-react';
import { useMantineColorScheme, useMantineTheme } from '@mantine/core';

interface SearchFieldProps extends TextInputProps {}

const SearchField = (props: SearchFieldProps) => {
  const { colorScheme } = useMantineColorScheme();
  const {
    colors: { gray },
  } = useMantineTheme();

  return (
    <TextInput
      placeholder="Search"
      icon={<MagnifyingGlass />}
      rightSectionWidth={90}
      css={`
        input {
          background: ${colorScheme === 'dark' ? gray[8] : gray[1]};
          &:not(:focus) {
            border: ${colorScheme === 'light' ? 'transparent' : undefined};
          }
        }
      `}
      {...props}
    />
  );
};

export default SearchField;
