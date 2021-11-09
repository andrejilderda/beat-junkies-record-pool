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

  const versionToFilter = pref === 'clean' ? 'dirty' : 'clean';

  return {
    ...item,
    versions: item.versions.filter(version => !version.tag?.toLowerCase().includes(versionToFilter))
  };
}

const filterByStatus = (item: CrateItem, db: DbItem[], enabledStatusFilters: string[]): boolean => {
  if (!enabledStatusFilters.length) return true;

  // here we invert the selection (the ones that need to be shown) into the
  // statuses that need to be filtered
  const statusesToFilter: string[] = ['reviewed', 'queue', 'downloaded', 'to-review'].filter(
    status => !enabledStatusFilters.includes(status));
  const idsToFilter = db
    .filter(item => statusesToFilter.includes(item.status))
    .map(item => item.id)

  return !idsToFilter.includes(item.id)
}

const getFilteredCrate = (
  crate: CrateItem[] = [],
  db: DbItem[] = [],
  filters: FilterState
): CrateItem[] => {

  const items = crate
    .filter(item => filterByStatus(item, db, filters.statuses))
    .filter(item => filterByGenre(item, filters.genres))
    .map(item => filterVersionsBasedOnDirtyCleanPreference(item, filters.dirtyCleanPreference))

  const filterItemsWithNoStatus = !filters.statuses.includes('to-review')
  if (!filterItemsWithNoStatus || !filters.statuses.length) return items;

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