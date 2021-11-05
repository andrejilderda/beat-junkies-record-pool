import { useMutation, useQueryClient } from 'react-query';
import { DbItem } from '../types';

export interface TrackMutation {
  id: number;
  versions?: number[];
  status?: DbItem['status'] | 'remove';
  invalidateDb?: boolean;
}

const useMutateTrack = () => {
  const queryClient = useQueryClient();

  return useMutation<
    unknown,
    unknown,
    TrackMutation
  >(async ({ id, versions, status }) => {
    const headers = { 'Content-Type': 'application/json' };
    const deleteMutation = () => fetch(`http://localhost:3002/tracks/${id}/`, {
      headers,
      method: 'DELETE',
    });

    if (!versions || !status) return deleteMutation();

    await deleteMutation();

    return fetch(`http://localhost:3002/tracks`, {
      headers,
      method: 'POST',
      body: JSON.stringify({
        id,
        versions,
        status,
      }),
    });
  }, {
    onSuccess: (_, { invalidateDb = true }) => {
      if (invalidateDb) queryClient.invalidateQueries('db');
    }
  });
}

export default useMutateTrack;