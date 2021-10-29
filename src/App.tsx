import React, { useState } from 'react';
import './App.css';
import { Virtuoso } from 'react-virtuoso';
import { useMutation, useQuery } from 'react-query';
import { unique } from './utils';
import Track from './Track';

interface Version {
  id: string;
  tag?: string;
}

export interface CrateItem {
  id: number;
  track: string;
  artist: string;
  genre: string;
  bpm: string;
  year: string;
  versions: Version[];
}

function App() {
  const [filter, setFilter] = useState('');
  const { isLoading, error, data } = useQuery<CrateItem[], Error>(
    ['crate', filter],
    () =>
      fetch(`http://localhost:3001/tracks${filter ? `?q=${filter}` : ''}`).then(
        res => res.json() as Promise<CrateItem[]>,
      ),
  );

  if (error) return <>An error has occurred: {error.message}</>;

  const genres = Array.isArray(data)
    ? unique(data?.map(item => item.genre || 'none')).sort()
    : [];

  return (
    <div className="List">
      <figure>
        <figcaption>Listen to the T-Rex:</figcaption>
        <audio
          controls
          src="https://beatjunkies.com/stream/?idattachment=425588&nocopy=425587.mp3"
        >
          Your browser does not support the
          <code>audio</code> element.
        </audio>
      </figure>
      {data?.length}
      <input
        type="text"
        placeholder="filter..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
      {isLoading ? (
        'Loading...'
      ) : (
        <>
          <Virtuoso
            totalCount={data?.length}
            data={data}
            itemContent={(index, item: CrateItem) => (
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <Track {...item} key={item.id} />
              </div>
            )}
          />
        </>
      )}
    </div>
  );
}

export default App;
