import { CrateItem, DbItem } from '../types';


const useCrateFilter = (
  crate: CrateItem[] = [],
  db: DbItem[] = [],
  statusFilters: string[] = []
): CrateItem[] => {
  const statusesToFilter: string[] = ['reviewed', 'queue', 'downloaded', 'no-status'].filter(
    status => !statusFilters.includes(status));

  const idsToFilter = db
    .filter(item => statusesToFilter.includes(item.status))
    .map(item => item.id)

  const filterItemsWithNoStatus = statusesToFilter.includes('no-status');

  const items = crate.filter(item => !idsToFilter.includes(item.id));
  if (!filterItemsWithNoStatus) return items;

  const itemsWithStatus = db.map(item => item.id);
  return items
    .filter(item => itemsWithStatus.includes(item.id));
}

export default useCrateFilter;