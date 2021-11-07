import 'styled-components/macro';
import { DirtyCleanPreference, FilterState } from './Filters.types';
import * as Styled from './Filters.styled';

interface FiltersProps {
  filters: FilterState;
  onStatusFilterChange(value: string[]): void;
  genreItems: string[];
  onGenreChange(value: string[]): void;
  onDirtyCleanPreferenceChange(value: string): void;
}

const Filters = ({
  filters,
  onStatusFilterChange,
  genreItems,
  onGenreChange,
  onDirtyCleanPreferenceChange,
}: FiltersProps) => {
  const { genres, statuses } = filters;

  return (
    <>
      <Styled.MultiSelect
        onChange={e => onStatusFilterChange(e)}
        placeholder="Filter by status"
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
      <Styled.GenreSelect
        onChange={e => onGenreChange(e)}
        value={genres}
        color="green"
        data={genreItems}
        clearable
        placeholder="Genres"
        valueComponent={() => (
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
      <Styled.SegmentedControl
        title="Filters out the dirty or clean version if both are available."
        value={filters.dirtyCleanPreference}
        size="xs"
        onChange={(value: DirtyCleanPreference) =>
          onDirtyCleanPreferenceChange(value)
        }
        data={[
          { label: 'All', value: 'all' },
          { label: 'Dirty', value: 'dirty' },
          { label: 'Clean', value: 'clean' },
        ]}
      />
    </>
  );
};

export default Filters;
