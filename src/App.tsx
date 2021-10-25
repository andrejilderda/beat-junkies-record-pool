import React, { useState } from 'react';
import './App.css';
import { Virtuoso } from 'react-virtuoso'
import { useQuery } from 'react-query';
import { unique } from './utils';

interface Version {
  id: string;
  tag?: string;
}

interface CrateItem {
  id: number;
  track: string;
  artist: string;
  genre: string;
  bpm: string;
  year: string;
  versions: Version[];
};

function App() {
  const [filter, setFilter] = useState('');
  const { isLoading, error, data, isFetching } = useQuery<CrateItem[], Error>(
    ["crate", filter],
    () =>
      fetch(
        `http://localhost:3001/tracks${filter ? `?q=${filter}` : ''}`
      )
        .then(res => res.json() as Promise<CrateItem[]>)
  );

  if (error) return <>An error has occurred: {error.message}</>;

  const genres = Array.isArray(data) ? unique(data?.map(item => item.genre || 'none')).sort() : [];

  const columns: GridColDef[] = [
    {
      field: 'id', headerName: 'ID', type: 'number',
      minWidth: 90,
      align: 'left',
      resizable: true,
    },
    {
      field: 'track',
      headerName: 'Track',
      minWidth: 200,
      align: 'left',
      resizable: true,
    },
    {
      field: 'artist',
      headerName: 'Artist',
      minWidth: 150,
      align: 'left',
      resizable: true,
    },
    {
      field: 'genre',
      headerName: 'Genre',
      minWidth: 200,
      align: 'left',
      resizable: true,
    },
    {
      field: 'bpm',
      headerName: 'Bpm',
      minWidth: 200,
      resizable: true,
      align: 'right',
    },
    {
      field: 'year',
      headerName: 'Year',
      sortable: true,
      minWidth: 160,
      align: 'right',
      resizable: true,
    },
  ];

  return (
    <div className="List">
      {data?.length}
      <input type="text" placeholder="filter..." value={filter} onChange={e => setFilter(e.target.value)} />
      {isLoading ? 'Loading...' :
        <Virtuoso
          totalCount={data?.length}
          data={data}
          itemContent={(index, item: CrateItem) => (
            <li key={index}>
              {item.artist} - {item.track} - <strong>{item.genre}</strong><br />
              {item.versions.length > 1 ? (
                <ul>
                  {item.versions.sort().map(version => <li key={version.id}>{version.tag ?? 'default'}</li>)}
                </ul>
              )
                : null
              }
            </li>
          )}
        />
      }
    </div>
  );
}

export default App;
