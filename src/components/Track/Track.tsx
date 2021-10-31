import React, { useEffect } from 'react';
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
import { CrateItem, Version, OnTrackChangeHandler, DbItem } from '../../types';
import * as S from './Track.styled';
import useMutateTrack from '../../hooks/useMutateTrack';
import TrackButton from '../TrackButton/TrackButton';

interface TrackProps extends CrateItem {
  onTrackChangeHandler: OnTrackChangeHandler;
  selected: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
  isPlaying: boolean;
  currentAudioPlayerTrack: Version | undefined;
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
  const updateStatus = (status: DbItem['status'] | 'remove') =>
    mutate({
      id,
      ...(status !== 'remove' && {
        versions: versions.map(version => Number(version.id)),
      }),
      ...(status !== 'remove' && { status }),
    });

  const onPlayIconClick = (
    e: React.MouseEvent,
    version: Version = versions[0],
  ) => {
    e.stopPropagation();
    onTrackChangeHandler(e, version);
  };

  const isInQueue = dbStatus?.status === 'queue';
  const isReviewed = dbStatus?.status === 'reviewed';

  return (
    <>
      {/* <IndeterminateCheckbox value="INDETERMINATE" /> */}
      <S.Wrapper selected={selected} onClick={onClick}>
        <S.Songwrapper>
          <S.TrackButtonWrapper>
            <TrackButton
              isOn={isReviewed}
              onClick={() => updateStatus(isReviewed ? 'remove' : 'reviewed')}
              onIcon={<CheckCircle weight="fill" size={24} />}
              offIcon={<Circle size={24} />}
            />
            <TrackButton
              isOn={isInQueue}
              onClick={() => updateStatus(isInQueue ? 'remove' : 'queue')}
              onIcon={<MinusCircle size={24} />}
              offIcon={<PlusCircle size={24} />}
            />
          </S.TrackButtonWrapper>
          <S.PlayIcon
            onClick={e => onPlayIconClick(e)}
            color="green"
            size="lg"
            radius="lg"
          >
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
                      {isPlaying && version === currentAudioPlayerTrack ? (
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
