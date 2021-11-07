// @ts-nocheck
import { useMutation, useQueryClient } from 'react-query';
import useMutateTrack, { TrackMutation } from './useMutateTrack';

const useMutateTracks = () => {
  const { mutateAsync } = useMutateTrack();
  const queryClient = useQueryClient();

  return useMutation<
    unknown,
    unknown,
    { tracks: TrackMutation[], status: TrackMutation['status'] }
  >(async ({ tracks, status }) => {
    const allMutations = tracks.map(({ id, versions }) => {
      return mutateAsync({
        id,
        versions: versions?.map(version => Number(version)),
        status,
        invalidateDb: false,
      })
    });

    return Promise.all(allMutations);
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('db');
    }
  });
}

export default useMutateTracks;