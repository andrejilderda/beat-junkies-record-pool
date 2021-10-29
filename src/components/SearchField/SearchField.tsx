import React from 'react';
import { TextInput } from '@mantine/core';
import { MagnifyingGlass } from 'phosphor-react';

const SearchField = () => (<TextInput
  placeholder="Search"
  icon={<MagnifyingGlass />}
  rightSectionWidth={90}
/>)

export default SearchField;