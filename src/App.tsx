import React, { RefObject, useRef, useState } from 'react';
import 'styled-components/macro';
import { Virtuoso } from 'react-virtuoso';
import 'react-h5-audio-player/lib/styles.css';
import Track from './components/Track';
import { useMantineColorScheme } from '@mantine/styles';
import { ActionIcon, Group, Loader } from '@mantine/core';
import AudioPlayer from './components/AudioPlayer';
import * as S from './App.styled';
import useSelection, { PivotReducerState } from 'react-selection-hooks';
import { CrateItem } from './types';
import H5AudioPlayer from 'react-h5-audio-player';
import { Moon } from 'phosphor-react';
import Keybindings from './components/Keybindings';
import Queue from './components/Queue';
import SelectionBar from './components/SelectionBar';
import AppName from './components/AppName';
import Filters from './components/Filters';
import useDb from './hooks/useDb';
import useCrate from './hooks/useCrate';
import useCrateFilter from './hooks/useCrateFilter';
import SearchField from './components/SearchField';
import useSearchField from './hooks/useSearchField';
import { DirtyCleanPreference } from './components/Filters/Filters.types';
import useAudioPlayer from './hooks/useAudioPlayer';

const getKey = (item: CrateItem) => item.id;

function App() {
  const { toggleColorScheme } = useMantineColorScheme();
  const [queueOpen, setQueueOpen] = useState(false);

  // crate + database + filters
  const { data: db } = useDb();
  const { value: searchQuery, onChange: onSearchChange } = useSearchField();
  const {
    isLoading,
    error,
    data: crate,
    genres: genreItems,
  } = useCrate(searchQuery);
  const {
    filters,
    dispatch: dispatchFilter,
    filteredCrate,
  } = useCrateFilter(crate, db);

  // selection
  const { selectedItems, selectAll, clearSelection, isSelected, onSelect } =
    useSelection<CrateItem, PivotReducerState<CrateItem>>(filteredCrate || [], {
      getKey,
    });

  // audioplayer
  const playerRef = useRef<H5AudioPlayer>();
  const {
    isPlaying,
    setIsPlaying,
    isLoadingTrack,
    setIsLoadingTrack,
    audioPlayerTrack,
    onNextPrevTrackHandler,
    handleTrackChange,
  } = useAudioPlayer(playerRef, filteredCrate);

  if (error)
    return <>An error has occurred while fetching tracks: {error.message}</>;

  return (
    <>
      <Keybindings
        playerRef={playerRef}
        clearSelection={clearSelection}
        selectAll={selectAll}
        playPrevNextTrack={onNextPrevTrackHandler}
        selection={selectedItems}
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
                value={searchQuery}
                onChange={onSearchChange}
                // prevent selecting all items when cmd + a
                onKeyDown={e => e.stopPropagation()}
                rightSection={
                  isLoading ? (
                    <Loader
                      size="sm"
                      color="blue"
                      css={`
                        margin-left: auto;
                        padding-right: 10px;
                      `}
                    />
                  ) : null
                }
              />
              <Filters
                filters={filters}
                onStatusFilterChange={value =>
                  dispatchFilter({ type: 'setStatuses', value })
                }
                genreItems={genreItems}
                onGenreChange={value =>
                  dispatchFilter({ type: 'setGenres', value })
                }
                onDirtyCleanPreferenceChange={(value: DirtyCleanPreference) =>
                  dispatchFilter({ type: 'setDirtyCleanPreference', value })
                }
              />
              <ActionIcon
                size="lg"
                variant="filled"
                onClick={() => toggleColorScheme()}
                title="Switch between light/dark mode"
              >
                <Moon size={20} />
              </ActionIcon>
              <Queue
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
            <SelectionBar
              selection={selectedItems}
              clearSelection={clearSelection}
            />
          </div>
        </div>
        <div style={{ flex: '1', padding: '0 16px' }}>
          <Virtuoso
            totalCount={filteredCrate?.length}
            data={filteredCrate}
            itemContent={(index, item: CrateItem) => (
              <Track
                key={item.id}
                onClick={(e: any) => onSelect(item, e)}
                onTrackChange={handleTrackChange}
                selected={isSelected(item)}
                isLoadingTrack={
                  isLoadingTrack &&
                  !!item.versions.find(
                    item => item.id === audioPlayerTrack?.version?.id,
                  )
                }
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
        <AudioPlayer
          src={
            audioPlayerTrack
              ? `https://beatjunkies.com/stream/?idattachment=${audioPlayerTrack?.version?.id}&nocopy=${audioPlayerTrack?.version?.streamId}.mp3`
              : ''
          }
          customVolumeControls={[]}
          customAdditionalControls={[]}
          onPause={() => setIsPlaying(false)}
          onPlaying={() => setIsPlaying(true)}
          onClickNext={() => onNextPrevTrackHandler('next')}
          onClickPrevious={() => onNextPrevTrackHandler('prev')}
          onLoadStart={() => setIsLoadingTrack(true)}
          onLoadedData={() => setIsLoadingTrack(false)}
          onEnded={() => onNextPrevTrackHandler('next')}
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
