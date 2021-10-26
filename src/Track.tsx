import React from 'react';
import { useMutation } from 'react-query';
import { CrateItem } from './App';
import IndeterminateCheckbox from './IndeterminateCheckbox';

const Track = ({ artist, track, versions, genre, id }: CrateItem) => {
  const { mutate } = useMutation<unknown, unknown, { id: number, versionId: number }>(
    ({id, versionId }) => {
      return fetch(`http://localhost:3001/tracks/${id}/`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'PATCH',
        body: JSON.stringify({
          [versionId]: 'downloaded'
        })
      });
    }
  );

  return (
    <>
      <IndeterminateCheckbox value="INDETERMINATE" />
      {artist} - {track} - <strong>{genre}</strong><br />
      {versions?.length > 1 ? (
        <ul>
          {versions.sort().map(({id: versionId, tag = 'default'}) => (
            <li key={versionId}>
              <input type="checkbox" />
              <button onClick={() => mutate({id, versionId: Number(versionId)})}>MUTATE</button>
              {tag}
            </li>
          ))}
        </ul>
      )
        : null
      }
    </>
  )
}

export default Track;