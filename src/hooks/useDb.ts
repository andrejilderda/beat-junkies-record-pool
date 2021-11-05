import { useQuery } from 'react-query';
import { DbItem } from '../types';

type Filter = { [key: string]: string | string[] }
type Filters = Filter[]

const useDb = (filters?: Filters) => {
  const filterString = filters?.map(filter => {
    const [key, value] = Object.entries(filter)[0];

    // multiple filters are allowed, e.g. '?status=queue&status=downloaded'
    const arr = Array.isArray(value) ? value : [value];
    return arr.map(item => `${key}=${item}`).join('&');
  }).join('&');
  const query = filters?.length ? `?${filterString}` : '';

  return useQuery<DbItem[], Error>(
    ['db', filters],
    () =>
      fetch(`http://localhost:3002/tracks${query}`).then(
        res => res.json() as Promise<DbItem[]>,
      ),
  );
}

export default useDb;