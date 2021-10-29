import { ActionIcon, Avatar, Badge, ThemeIcon } from '@mantine/core';
import { PhoneIncoming, Airplane, PlayCircle, Play } from 'phosphor-react';
import React from 'react';
import { useMutation } from 'react-query';
import { CrateItem } from '../../App';
import IndeterminateCheckbox from '../../IndeterminateCheckbox';
import * as S from './Track.styled';

interface TrackProps extends CrateItem {
  onTrackChangeHandler(versionId: string, streamId: string): void;
}

const Track = ({ artist, track, versions, genre, id }: TrackProps) => {
  const { mutate } = useMutation<
    unknown,
    unknown,
    { id: number; versionId: number }
  >(({ id, versionId }) => {
    return fetch(`http://localhost:3002/tracks/${id}/`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'PATCH',
      body: JSON.stringify({
        [versionId]: 'downloaded',
      }),
    });
  });

  return (
    <>
      {/* <IndeterminateCheckbox value="INDETERMINATE" /> */}
      <S.Wrapper>
        <S.PlayIcon color='green' size="lg" radius="lg">
          <Play />
        </S.PlayIcon>
        <S.Songwrapper>
          <S.Title>
            {track}
          </S.Title>
          <S.Artist>
            {artist}
          </S.Artist>
        </S.Songwrapper>
        <S.Genre>{genre}</S.Genre>
        <S.VersionWrapper>
          {versions?.length > 1 ? (
            <ul>
              {versions.sort().map(({ id: versionId, tag = 'default' }) => (
                <Badge key={versionId} style={{ paddingLeft: 0 }} size="lg" color="gray" leftSection={<ActionIcon>
                  <PlayCircle size={48} />
                </ActionIcon>}>
                  <label onClick={() => mutate({ id, versionId: Number(versionId) })} htmlFor={versionId}>
                    <input type="checkbox" id={versionId} />
                    {tag}
                  </label>
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
