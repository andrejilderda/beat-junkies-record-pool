import { MultiSelect, SegmentedControl } from '@mantine/core';
import styled from 'styled-components';
import 'styled-components/macro';
import { FilterState } from '../../hooks/useCrateFilter';

interface FiltersProps {
  filters: FilterState;
  onStatusFilterChange(value: string[]): void;
  genreItems: string[];
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
  filters,
  onStatusFilterChange,
  genreItems,
  onGenreChange,
}: FiltersProps) => {
  const { genres, statuses } = filters;

  return (
    <>
      <StyledMultiSelect
        onChange={e => onStatusFilterChange(e)}
        value={statuses}
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
        value={genres}
        color="green"
        data={genreItems}
        clearable
        placeholder="Genres"
        valueComponent={(...e) => (
          <>
            {!!genres.length && (
              <span>
                {genres.length} {genres.length > 1 ? 'genres' : 'genre'}{' '}
                selected
              </span>
            )}
          </>
        )}
      />
    </>
  );
};

export default Filters;
