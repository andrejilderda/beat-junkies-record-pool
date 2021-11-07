export type DirtyCleanPreference = 'dirty' | 'clean' | 'all';

export interface FilterState {
  statuses: string[];
  genres: string[];
  dirtyCleanPreference: DirtyCleanPreference;
}

export type FilterReducerAction =
  | { type: 'setStatuses'; value: string[] }
  | { type: 'setGenres'; value: string[] }
  | { type: 'setDirtyCleanPreference'; value: DirtyCleanPreference }
  | { type: 'reset' };