import React, { useState } from 'react';
import './App.css';
import { Virtuoso } from 'react-virtuoso';
import { useMutation, useQuery } from 'react-query';
import 'react-h5-audio-player/lib/styles.css';
import { unique } from './utils';
import Track from './components/Track/Track';
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/styles';
import { StyledAudioPlayer } from './components/AudioPlayer/AudioPlayer';
import * as S from './App.styled';
import SearchField from './components/SearchField/SearchField';

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
  const [colorScheme, setColorScheme] = useState('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  const [filter, setFilter] = useState('');
  const [trackUrl, setTrackUrl] = useState<string | undefined>(undefined);

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

  const onTrackChangeHandler = (versionId: string, streamId: string) => {
    setTrackUrl(`https://beatjunkies.com/stream/?idattachment=${versionId}&nocopy=${streamId}.mp3`);
  }


  return (
    <ColorSchemeProvider colorScheme='dark' toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{
        fontFamily: 'Open Sans',
        colorScheme: 'dark'
      }}>
        <S.Layout>
          <div style={{ flex: '0 0 auto', padding: '0 16px' }}>
            {data?.length}
            <SearchField />
            <input
              type="text"
              placeholder="filter..."
              value={filter}
              onChange={e => setFilter(e.target.value)}
            />
          </div>
          <div style={{ flex: '1', padding: '0 16px' }}>
            {isLoading ? (
              'Loading...'
            ) : (
              <>
                <Virtuoso
                  totalCount={data?.length}
                  data={data}
                  itemContent={(index, item: CrateItem) => (
                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                      <Track {...item} key={item.id} onTrackChangeHandler={onTrackChangeHandler} />
                    </div>
                  )}
                />
              </>
            )}
          </div>
          <div style={{ flex: '0' }}>
            <StyledAudioPlayer src={trackUrl} customVolumeControls={[]} customAdditionalControls={[]} showSkipControls={true} layout="horizontal-reverse" progressJumpSteps={{ forward: 15000, backward: 15000 }} />
          </div>
        </S.Layout>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
