import { useMutation, useQueryClient } from 'react-query';

const useMutateTrack = () => {
  const queryClient = useQueryClient();

  return useMutation<
    unknown,
    unknown,
    {
      id: number;
      versions?: number[];
      status?: 'reviewed' | 'queue' | 'downloaded';
    }
  >(async ({ id, versions, status }) => {
    console.log('id', id);
    console.log('versions', versions);
    console.log('status', status);
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
    onSuccess: () => queryClient.invalidateQueries('db')
  });
}

export default useMutateTrack;