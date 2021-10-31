import React from 'react';
import { TextInput, TextInputProps } from '@mantine/core';
import { MagnifyingGlass } from 'phosphor-react';

interface SearchFieldProps extends TextInputProps { }

const SearchField = (props: SearchFieldProps) => (<TextInput
  placeholder="Search"
  icon={<MagnifyingGlass />}
  rightSectionWidth={90}
  {...props}
/>)

export default SearchField;