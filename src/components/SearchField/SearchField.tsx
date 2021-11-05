import React from 'react';
import 'styled-components/macro';
import { TextInput, TextInputProps } from '@mantine/core';
import { MagnifyingGlass } from 'phosphor-react';
import { useMantineColorScheme } from '@mantine/core';

interface SearchFieldProps extends TextInputProps {}

const SearchField = (props: SearchFieldProps) => {
  const { colorScheme } = useMantineColorScheme();

  return (
    <TextInput
      placeholder="Search"
      icon={<MagnifyingGlass />}
      rightSectionWidth={90}
      css={`
        flex: 1;
        margin: 0;

        &:focus-within {
          svg {
            color: var(--gray-5);
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
        }

        [data-theme='light'] & {
          svg {
            color: var(--gray-4);
          }

          input:not(:focus) {
            background: var(--gray-7);
            border: transparent;
          }
        }
      `}
      {...props}
    />
  );
};

export default SearchField;
