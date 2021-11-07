import styled from 'styled-components';
import { MultiSelect as MantineMultiSelect, SegmentedControl as MantineSegmentedControl } from '@mantine/core';

export const MultiSelect = styled(MantineMultiSelect)`
  margin-left: 8px;
  min-width: 300px;

  .mantine-MultiSelect-root {
    background: var(--gray-8);
    color: var(--gray-3);

    &::placeholder {
      color: var(--gray-5);
    }
  }

  .mantine-MultiSelect-input {
    padding-left: 6px;

    [data-theme='light'] & {
      background: var(--gray-7);
      border: transparent;
    }
  }

  .mantine-MultiSelect-value {
    margin-right: 0;
  }

  .mantine-MultiSelect-dropdown {
    border: 1px solid var(--gray-8);
  }

  [data-theme='light'] & {
    .mantine-MultiSelect-hovered {
      color: var(--gray-8);
    }
  }
`;

export const GenreSelect = styled(MultiSelect)`
  color: var(--gray-3);

  &::placeholder {
    color: var(--gray-6);
  }

  .mantine-MultiSelect-values {
    padding-left: 12px;
  }
  span + span {
    display: none;
  }

  svg {
    color: var(--gray-5) !important;
  }
`;

export const SegmentedControl = styled(MantineSegmentedControl)`
  background: var(--gray-8);
  margin-left: 8px;
  padding: 6px 4px;

  .mantine-SegmentedControl-label,
  .mantine-SegmentedControl-labelActive {
    color: var(--gray-5);
  }

  .mantine-SegmentedControl-labelActive {
    color: var(--gray-3);
  }

  .mantine-SegmentedControl-control:not(:first-of-type) {
    border-left-color: var(--gray-6);
  }

  [data-theme='dark'] & {
    .mantine-SegmentedControl-active {
      background-color: var(--gray-7);
    }
  }

  [data-theme='light'] & {
    background: var(--gray-7);
    border: transparent;
  }
`;