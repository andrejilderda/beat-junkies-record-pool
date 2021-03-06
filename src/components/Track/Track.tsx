import React from 'react';
import { ActionIcon } from '@mantine/core';
import {
  Play,
  Pause,
  PlusCircle,
  Circle,
  MinusCircle,
  CheckCircle,
  SpotifyLogo,
} from 'phosphor-react';
import {
  CrateItem,
  Version,
  HandleTrackChange,
  DbItem,
  AudioPlayerTrack,
} from '../../types';
import * as S from './Track.styled';
import useMutateTrack, { TrackMutation } from '../../hooks/useMutateTrack';
import TrackButton from '../TrackButton';

interface TrackProps extends CrateItem {
  onTrackChange: HandleTrackChange;
  selected: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
  isPlaying: boolean;
  currentAudioPlayerTrack: AudioPlayerTrack | undefined;
  dbStatus: DbItem | undefined;
  isLoadingTrack: boolean;
}

const Track = ({
  artist,
  track,
  versions,
  genre,
  id,
  selected,
  onClick,
  onTrackChange,
  isPlaying,
  currentAudioPlayerTrack,
  dbStatus,
  isLoadingTrack,
}: TrackProps) => {
  const { mutate } = useMutateTrack();

  const updateStatus = (status: TrackMutation['status']) =>
    mutate({
      id,
      ...(status !== 'reset' && {
        versions: versions.map(version => Number(version.id)),
        status,
      }),
    });

  const onPlayIconClick = (
    e: React.MouseEvent,
    version: Version = versions[0],
  ) => {
    e.stopPropagation();
    onTrackChange(e, { id, version });
  };

  const isInQueue = dbStatus?.status === 'queue';
  const isReviewed = dbStatus?.status === 'reviewed';
  const isDownloaded = dbStatus?.status === 'downloaded';

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
              isOn={isReviewed || isDownloaded}
              onClick={() => updateStatus(isReviewed ? 'reset' : 'reviewed')}
              onIcon={
                isReviewed ? (
                  <CheckCircle weight="fill" size={24} />
                ) : (
                  <CheckCircle weight="fill" color="var(--green-7)" size={24} />
                )
              }
              offIcon={<Circle weight="light" size={24} />}
              title={isReviewed ? 'Unmark as reviewed' : 'Mark as reviewed'}
            />
            <TrackButton
              isOn={isInQueue}
              onClick={() => updateStatus(isInQueue ? 'reset' : 'queue')}
              onIcon={<MinusCircle weight="fill" size={24} />}
              offIcon={<PlusCircle weight="light" size={24} />}
              title={isInQueue ? 'Remove from queue' : 'Add to queue'}
            />
          </S.TrackButtonWrapper>
          <S.PlayIcon onClick={e => onPlayIconClick(e)} size="lg" radius="lg">
            {isLoadingTrack ? (
              <S.Loader size="xs" />
            ) : isPlaying ? (
              <Pause />
            ) : (
              <Play />
            )}
          </S.PlayIcon>
          <div>
            <S.Title $isPlaying={isPlaying}>{track}</S.Title>
            <S.Artist>{artist}</S.Artist>
          </div>
        </S.Songwrapper>
        <S.Genre>{genre}</S.Genre>
        <S.VersionWrapper>
          {versions?.length >= 1 ? (
            <>
              {versions.sort().map(version => {
                if (!version?.tag?.trim()) return null;

                return (
                  <S.VersionItem key={version.id}>
                    <S.Badge
                      style={{ paddingLeft: 0 }}
                      size="lg"
                      color="gray"
                      $selected={selected}
                      onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                        onPlayIconClick(e, version)
                      }
                      leftSection={
                        <ActionIcon>
                          {isPlaying &&
                          version === currentAudioPlayerTrack?.version ? (
                            <Pause weight="fill" size={12} />
                          ) : (
                            <Play weight="regular" size={12} />
                          )}
                        </ActionIcon>
                      }
                      $isPlaying={
                        isPlaying &&
                        version === currentAudioPlayerTrack?.version
                      }
                    >
                      <label>
                        {/* Replace only the first ( & ) in the string */}
                        {version?.tag?.replace(/\(/, '').replace(/\)/, '') ||
                          ''}
                      </label>
                    </S.Badge>
                  </S.VersionItem>
                );
              })}
            </>
          ) : null}
        </S.VersionWrapper>
        <S.SpotifyLogo href={`spotify:search:${artist} ${track}`}>
          <SpotifyLogo size={24} weight="thin" />
        </S.SpotifyLogo>
      </S.Wrapper>
    </>
  );
};

export default Track;
