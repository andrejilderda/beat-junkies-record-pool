import { Loader, MultiSelect, SegmentedControl } from '@mantine/core';
import styled from 'styled-components';
import 'styled-components/macro';
import SearchField from '../SearchField';

interface FiltersProps {
  loading: boolean;
  searchValue: string;
  onSearchChange(e: React.ChangeEvent<HTMLInputElement>): void;
  statusFilters: string[];
  onStatusFilterChange(value: string[]): void;
  genreItems: string[];
  genreSelection: string[];
  onGenreChange(value: string[]): void;
}

const StyledMultiSelect = styled(MultiSelect)`
  margin-left: 8px;
  min-width: 300px;

  .mantine-MultiSelect-root {
    background: var(--gray-8);
    color: var(--gray-3);

    &:placeholder {
      color: var(--gray-6);
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
`;

const StyledGenreSelect = styled(StyledMultiSelect)`
  .mantine-MultiSelect-values {
    padding-left: 12px;
  }
  span + span {
    display: none;
  }
`;

const Filters = ({
  loading,
  searchValue,
  onSearchChange,
  onStatusFilterChange,
  statusFilters,
  genreItems,
  genreSelection,
  onGenreChange,
}: FiltersProps) => {
  return (
    <>
      <SearchField
        value={searchValue}
        onChange={onSearchChange}
        // prevent selecting all items when cmd + a
        onKeyDown={e => e.stopPropagation()}
        rightSection={
          loading ? (
            <Loader
              size="sm"
              color="blue"
              css={`
                margin-left: auto;
                padding-right: 10px;
              `}
            />
          ) : null
        }
      />
      <StyledMultiSelect
        onChange={e => onStatusFilterChange(e)}
        value={statusFilters}
        color="green"
        data={[
          {
            value: 'to-review',
            label: 'To review',
          },
          {
            value: 'reviewed',
            label: 'Reviewed',
          },
          {
            value: 'queue',
            label: 'Queue',
          },
          {
            value: 'downloaded',
            label: 'Downloaded',
          },
        ]}
      />
      <StyledGenreSelect
        onChange={e => onGenreChange(e)}
        value={genreSelection}
        color="green"
        data={genreItems}
        clearable
        placeholder="Genres"
        valueComponent={(...e) => (
          <>
            {!!genreSelection.length && (
              <span>
                {genreSelection.length}{' '}
                {genreSelection.length > 1 ? 'genres' : 'genre'} selected
              </span>
            )}
          </>
        )}
      />
    </>
  );
};

export default Filters;
