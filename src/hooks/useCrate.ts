import { useQuery } from 'react-query';
import { CrateItem } from '../types';

const useCrate = (searchQuery: string) => {
  return useQuery<CrateItem[], Error>(
    ['crate', searchQuery],
    () => {
      const query = [searchQuery
        ? `q=${searchQuery}`
        : undefined,
      ]
        .filter(Boolean)
        .join('&');

      return fetch(
        `http://localhost:3001/tracks${query ? `?${query}` : ''}`
      )
        .then(res => res.json() as Promise<CrateItem[]>)
    },
  );
}

export default useCrate;