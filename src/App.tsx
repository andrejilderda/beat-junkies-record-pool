import React, { RefObject, useEffect, useRef, useState } from 'react';
import './App.css';
import { Virtuoso } from 'react-virtuoso';
import { useMutation, useQuery } from 'react-query';
import 'react-h5-audio-player/lib/styles.css';
import { unique } from './utils';
import Track from './components/Track/Track';
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/styles';
import { StyledAudioPlayer } from './components/AudioPlayer/AudioPlayer';
import * as S from './App.styled';
import SearchField from './components/SearchField/SearchField';
import useSelection, { PivotReducerState } from 'react-selection-hooks';
import { CrateItem, DbItem, OnTrackChangeHandler, Version } from './types';
import H5AudioPlayer from 'react-h5-audio-player';
import useMutateTrack from './hooks/useMutateTrack';

const getKey = (item: CrateItem) => item.id;

function App() {
  const [colorScheme, setColorScheme] = useState('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  const [filter, setFilter] = useState('');
  const [audioPlayerTrack, setAudioPlayerTrack] = useState<Version | undefined>(
    undefined,
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const { isLoading, error, data } = useQuery<CrateItem[], Error>(
    ['crate', filter],
    () =>
      fetch(`http://localhost:3001/tracks${filter ? `?q=${filter}` : ''}`).then(
        res => res.json() as Promise<CrateItem[]>,
      ),
  );

  const { data: db } = useQuery<DbItem[], Error>('db', () =>
    fetch(`http://localhost:3002/tracks/`).then(
      res => res.json() as Promise<DbItem[]>,
    ),
  );

  console.log('db', db);

  const { selectedItems, selectAll, clearSelection, isSelected, onSelect } =
    useSelection<CrateItem, PivotReducerState<CrateItem>>(data || [], {
      getKey,
    });
  console.log('selectedItems', selectedItems);

  const playerRef = useRef<H5AudioPlayer>();

  if (error) return <>An error has occurred: {error.message}</>;

  const genres = Array.isArray(data)
    ? unique(data?.map(item => item.genre || 'none')).sort()
    : [];

  const onTrackChangeHandler: OnTrackChangeHandler = (e, version) => {
    if (audioPlayerTrack === version) {
      playerRef.current?.togglePlay(e);
      setIsPlaying(prevState => !prevState);
    } else setAudioPlayerTrack(version);
  };

  return (
    <ColorSchemeProvider
      colorScheme="dark"
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          fontFamily: 'Open Sans',
          colorScheme: 'dark',
        }}
      >
        <S.Layout>
          <div style={{ flex: '0 0 auto', padding: '0 16px' }}>
            {data?.length}
            <SearchField
              value={filter}
              onChange={e => setFilter(e.target.value)}
            />
          </div>
          <button onClick={() => selectAll()}>All</button>
          <button onClick={() => clearSelection()}>Clear</button>
          <div style={{ flex: '1', padding: '0 16px' }}>
            {isLoading ? (
              'Loading...'
            ) : (
              <Virtuoso
                totalCount={data?.length}
                data={data}
                itemContent={(index, item: CrateItem) => (
                  <Track
                    key={item.id}
                    onClick={(e: any) => onSelect(item, e)}
                    onTrackChangeHandler={onTrackChangeHandler}
                    selected={isSelected(item)}
                    isPlaying={
                      isPlaying &&
                      !!item.versions.find(
                        item => item.id === audioPlayerTrack?.id,
                      )
                    }
                    dbStatus={db?.find(dbItem => dbItem.id === item.id)}
                    currentAudioPlayerTrack={audioPlayerTrack}
                    {...item}
                  />
                )}
              />
            )}
          </div>
          <StyledAudioPlayer
            src={
              audioPlayerTrack
                ? `https://beatjunkies.com/stream/?idattachment=${audioPlayerTrack?.id}&nocopy=${audioPlayerTrack?.streamId}.mp3`
                : ''
            }
            customVolumeControls={[]}
            customAdditionalControls={[]}
            volume={0}
            onPause={() => setIsPlaying(false)}
            onPlaying={() => setIsPlaying(true)}
            layout="horizontal-reverse"
            progressJumpSteps={{ forward: 15000, backward: 15000 }}
            showSkipControls={true}
            ref={playerRef as RefObject<H5AudioPlayer>}
          />
        </S.Layout>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
