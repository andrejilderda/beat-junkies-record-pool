import { Dispatch, useMemo, useReducer } from 'react';
import { CrateItem, DbItem } from '../types';

export interface FilterState {
  statuses: string[];
  genres: string[];
}

type FilterReducerAction =
  | { type: 'setStatuses'; value: string[] }
  | { type: 'setGenres'; value: string[] }
  | { type: 'reset' };

const initialFilterState = {
  statuses: ['to-review'],
  genres: [],
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
    case 'reset':
      return initialFilterState;
  }
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