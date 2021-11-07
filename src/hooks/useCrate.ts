import { useRef } from 'react';
import { useQuery, UseQueryResult } from 'react-query';
import { CrateItem } from '../types';
import { unique } from '../utils';

const getGenres = (crate: CrateItem[]) => Array.isArray(crate)
  ? unique(crate?.map(item => item.genre || 'none')).sort()
  : [];

const useCrate = (searchQuery: string)
  : UseQueryResult<CrateItem[], Error> & { genres: string[] } => {
  const genres = useRef<string[]>([]);

  const query = useQuery<CrateItem[], Error>(
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
    {
      onSuccess: (crate) => {
        // only get genres from first successful fetch
        if (genres?.current.length) return;
        genres.current = getGenres(crate)
      }
    }
  );

  return {
    ...query,
    genres: genres.current,
  }
}

export default useCrate;