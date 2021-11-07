import { Dispatch, useMemo, useReducer } from 'react';
import { CrateItem, DbItem } from '../types';
import { FilterState, FilterReducerAction, DirtyCleanPreference } from '../components/Filters/Filters.types';

const initialFilterState: FilterState = {
  statuses: ['to-review'],
  genres: [],
  dirtyCleanPreference: 'dirty',
};

const filterReducer = (
  state: FilterState,
  action: FilterReducerAction,
): FilterState => {
  switch (action.type) {
    case 'setStatuses':
      return {
        ...state,
        statuses: action.value,
      };
    case 'setGenres':
      return {
        ...state,
        genres: action.value,
      };
    case 'setDirtyCleanPreference':
      return {
        ...state,
        dirtyCleanPreference: action.value,
      };
    case 'reset':
      return initialFilterState;
  }
};

const filterByGenre = (item: CrateItem, genres: string[]) => {
  if (!genres.length) return true;
  return genres.includes(item.genre);
}

const filterVersionsBasedOnDirtyCleanPreference = (item: CrateItem, pref: DirtyCleanPreference): CrateItem => {
  if (pref === 'all') return item;
  const hasCleanVersion = item.versions.some(version => version.tag?.toLowerCase().includes('clean'))
  const hasDirtyVersion = item.versions.some(version => version.tag?.toLowerCase().includes('dirty'));
  if (!(hasCleanVersion && hasDirtyVersion)) return item;

  return {
    ...item,
    versions: item.versions.filter(version => version.tag?.toLowerCase().includes(pref))
  };
}

const getFilteredCrate = (
  crate: CrateItem[] = [],
  db: DbItem[] = [],
  filters: FilterState
): CrateItem[] => {
  // here we invert the selection (the ones that need to be shown) into the
  // statuses that need to be filtered
  const statusesToFilter: string[] = ['reviewed', 'queue', 'downloaded', 'to-review'].filter(
    status => !filters.statuses.includes(status));
  const filterItemsWithNoStatus = statusesToFilter.includes('to-review');
  const idsToFilter = db
    .filter(item => statusesToFilter.includes(item.status))
    .map(item => item.id)

  const items = crate
    .filter(item => !idsToFilter.includes(item.id))
    .filter(item => filterByGenre(item, filters.genres))
    .map(item => filterVersionsBasedOnDirtyCleanPreference(item, filters.dirtyCleanPreference))

  if (!filterItemsWithNoStatus) return items;

  const itemsWithStatus = db.map(item => item.id);
  return items
    .filter(item => itemsWithStatus.includes(item.id));
}

interface UseCrateFilterResult {
  filters: FilterState;
  dispatch: Dispatch<FilterReducerAction>;
  filteredCrate: CrateItem[];
}

const useCrateFilter = (
  crate: CrateItem[] = [],
  db: DbItem[] = [],
): UseCrateFilterResult => {
  const [filters, dispatch] = useReducer(filterReducer, initialFilterState);

  const filteredCrate = useMemo(() => getFilteredCrate(crate, db, filters),
    [crate, db, filters]);

  return {
    filters,
    dispatch,
    filteredCrate,
  }
}

export default useCrateFilter;