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
        &:focus-within {
          svg {
            color: var(--green-05);
          }
        }
        svg {
          color: var(--gray-6);
        }

        input {
          background: var(--gray-8);
          color: var(--gray-3);

          &:placeholder {
            color: var(--gray-6);
          }

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
