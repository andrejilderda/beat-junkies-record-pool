import React, { RefObject, useRef, useState } from 'react';
import 'styled-components/macro';
import { Virtuoso } from 'react-virtuoso';
import { useQuery } from 'react-query';
import 'react-h5-audio-player/lib/styles.css';
import { unique } from './utils';
import Track from './components/Track/Track';
import { useMantineColorScheme } from '@mantine/styles';
import { ActionIcon, Group, Loader } from '@mantine/core';
import { StyledAudioPlayer } from './components/AudioPlayer/AudioPlayer';
import * as S from './App.styled';
import useSelection, { PivotReducerState } from 'react-selection-hooks';
import SearchField from './components/SearchField/SearchField';
import {
  CrateItem,
  DbItem,
  OnTrackChangeHandler,
  AudioPlayerTrack,
} from './types';
import H5AudioPlayer from 'react-h5-audio-player';
import { Moon } from 'phosphor-react';
import Keybindings from './components/Keybindings/Keybindings';
import Queue from './components/Queue/Queue';
import MultiSelect from './components/MultiSelect';
import AppName from './components/AppName';

const getKey = (item: CrateItem) => item.id;

function App() {
  const { toggleColorScheme } = useMantineColorScheme();
  const [filter, setFilter] = useState('');
  const [audioPlayerTrack, setAudioPlayerTrack] = useState<
    AudioPlayerTrack | undefined
  >(undefined);
  const playerRef = useRef<H5AudioPlayer>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [queueOpen, setQueueOpen] = useState(false);
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

  const { selectedItems, selectAll, clearSelection, isSelected, onSelect } =
    useSelection<CrateItem, PivotReducerState<CrateItem>>(data || [], {
      getKey,
    });

  const genres = Array.isArray(data)
    ? unique(data?.map(item => item.genre || 'none')).sort()
    : [];

  const onTrackChangeHandler: OnTrackChangeHandler = (e, track) => {
    if (audioPlayerTrack?.version === track.version) {
      playerRef.current?.togglePlay(e);
      setIsPlaying(prevState => !prevState);
    } else setAudioPlayerTrack(track);
  };

  if (error)
    return <>An error has occurred while fetching tracks: {error.message}</>;

  return (
    <>
      <Keybindings
        playerRef={playerRef}
        clearSelection={clearSelection}
        selectAll={selectAll}
      />
      <S.Layout>
        <div
          css={`
            flex: 0 0 auto;
            padding: 0 16px;
          `}
        >
          <AppName />
          <div
            css={`
              position: relative;
            `}
          >
            <Group position="apart" spacing="md" withGutter>
              <SearchField
                value={filter}
                onChange={e => setFilter(e.target.value)}
                rightSection={
                  isLoading ? (
                    <Loader
                      size="sm"
                      color="blue"
                      style={{
                        marginLeft: 'auto',
                        paddingRight: '10px',
                      }}
                    />
                  ) : null
                }
              />
              <ActionIcon
                size="lg"
                variant="filled"
                onClick={() => toggleColorScheme()}
              >
                <Moon size={20} />
              </ActionIcon>
              <Queue
                // title="Download queue"
                opened={queueOpen}
                queue={selectedItems}
                setOpen={setQueueOpen}
                onClose={() => setQueueOpen(false)}
                padding="xl"
                size="xl"
                position="right"
                overlayColor="rgba(0,0,0,0.9)"
                shadow="xl"
              />
            </Group>
            <MultiSelect
              selection={selectedItems}
              clearSelection={clearSelection}
            />
          </div>
        </div>
        <div style={{ flex: '1', padding: '0 16px' }}>
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
                    item => item.id === audioPlayerTrack?.version?.id,
                  )
                }
                dbStatus={db?.find(dbItem => dbItem.id === item.id)}
                currentAudioPlayerTrack={audioPlayerTrack}
                {...item}
              />
            )}
          />
        </div>
        <StyledAudioPlayer
          src={
            audioPlayerTrack
              ? `https://beatjunkies.com/stream/?idattachment=${audioPlayerTrack?.version?.id}&nocopy=${audioPlayerTrack?.version?.streamId}.mp3`
              : ''
          }
          customVolumeControls={[]}
          customAdditionalControls={[]}
          onPause={() => setIsPlaying(false)}
          onPlaying={() => setIsPlaying(true)}
          layout="horizontal-reverse"
          progressJumpSteps={{ forward: 15000, backward: 15000 }}
          showSkipControls={true}
          ref={playerRef as RefObject<H5AudioPlayer>}
        />
      </S.Layout>
    </>
  );
}

export default App;
