import React from 'react';
import { ActionIcon, Badge } from '@mantine/core';
import {
  PlayCircle,
  Play,
  Pause,
  PlusCircle,
  Circle,
  PauseCircle,
  MinusCircle,
  CheckCircle,
} from 'phosphor-react';
import {
  CrateItem,
  Version,
  OnTrackChangeHandler,
  DbItem,
  AudioPlayerTrack,
} from '../../types';
import * as S from './Track.styled';
import useMutateTrack, { TrackMutation } from '../../hooks/useMutateTrack';
import TrackButton from '../TrackButton/TrackButton';

interface TrackProps extends CrateItem {
  onTrackChangeHandler: OnTrackChangeHandler;
  selected: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
  isPlaying: boolean;
  currentAudioPlayerTrack: AudioPlayerTrack | undefined;
  dbStatus: DbItem | undefined;
}

const Track = ({
  artist,
  track,
  versions,
  genre,
  id,
  selected,
  onClick,
  onTrackChangeHandler,
  isPlaying,
  currentAudioPlayerTrack,
  dbStatus,
}: TrackProps) => {
  const { mutate } = useMutateTrack();

  const updateStatus = (status: TrackMutation['status']) =>
    mutate({
      id,
      ...(status !== 'remove' && {
        versions: versions.map(version => Number(version.id)),
        status,
      }),
    });

  const onPlayIconClick = (
    e: React.MouseEvent,
    version: Version = versions[0],
  ) => {
    e.stopPropagation();
    onTrackChangeHandler(e, { id, version });
  };

  const isInQueue = dbStatus?.status === 'queue';
  const isReviewed = dbStatus?.status === 'reviewed';

  return (
    <>
      <S.Wrapper
        selected={selected}
        onClick={onClick}
        $isInQueue={isInQueue}
        $isReviewed={isReviewed}
      >
        <S.Songwrapper>
          <S.TrackButtonWrapper>
            <TrackButton
              isOn={isReviewed}
              onClick={() => updateStatus(isReviewed ? 'remove' : 'reviewed')}
              onIcon={<CheckCircle weight="fill" size={24} />}
              offIcon={<Circle weight="light" size={24} />}
              title={isReviewed ? 'Unmark as reviewed' : 'Mark as reviewed'}
            />
            <TrackButton
              isOn={isInQueue}
              onClick={() => updateStatus(isInQueue ? 'remove' : 'queue')}
              onIcon={<MinusCircle weight="light" size={24} />}
              offIcon={<PlusCircle weight="light" size={24} />}
              title={isInQueue ? 'Remove from queue' : 'Add to queue'}
            />
          </S.TrackButtonWrapper>
          <S.PlayIcon onClick={e => onPlayIconClick(e)} size="lg" radius="lg">
            {isPlaying ? <Pause /> : <Play />}
          </S.PlayIcon>
          <div>
            <S.Title $isPlaying={isPlaying}>{track}</S.Title>
            <S.Artist>{artist}</S.Artist>
          </div>
        </S.Songwrapper>
        <S.Genre>{genre}</S.Genre>
        <S.VersionWrapper>
          {versions?.length > 1 ? (
            <ul>
              {versions.sort().map(version => (
                <Badge
                  key={version.id}
                  style={{ paddingLeft: 0 }}
                  size="lg"
                  color="gray"
                  onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                    onPlayIconClick(e, version)
                  }
                  leftSection={
                    <ActionIcon>
                      {isPlaying &&
                      version === currentAudioPlayerTrack?.version ? (
                        <PauseCircle size={24} />
                      ) : (
                        <PlayCircle size={24} />
                      )}
                    </ActionIcon>
                  }
                >
                  <label>{version.tag || ''}</label>
                </Badge>
              ))}
            </ul>
          ) : null}
        </S.VersionWrapper>
      </S.Wrapper>
    </>
  );
};

export default Track;
