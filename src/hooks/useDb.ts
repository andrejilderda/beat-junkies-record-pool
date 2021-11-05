import { useQuery } from 'react-query';
import { DbItem } from '../types';

type Filter = { [key: string]: string }
type Filters = Filter[]

const useDb = (filters: Filters) => {
  const filterString = filters.map(filter => {
    const [key, value] = Object.entries(filter)[0];
    return `${key}=${value}`
  }).join('&');
  const query = filters?.length ? `?${filterString}` : null;

  return useQuery<DbItem[], Error>(
    ['db', filters],
    () =>
      fetch(`http://localhost:3002/tracks${query}`).then(
        res => res.json() as Promise<DbItem[]>,
      ),
  );
}

export default useDb;