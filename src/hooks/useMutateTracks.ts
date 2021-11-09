// @ts-nocheck
import { useMutation, useQueryClient } from 'react-query';
import useMutateTrack, { TrackMutation } from './useMutateTrack';

const useMutateTracks = () => {
  const { mutateAsync } = useMutateTrack();
  const queryClient = useQueryClient();

  const { mutate, ...useMutationResult } = useMutation<
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

  const mutateStatus = (status: TrackMutation['status'], selection: CrateItem[]) => {
    const tracks = selection.map(({ id, versions }) => {
      return {
        id,
        versions: versions.map(version => Number(version.id)),
      };
    });

    mutate({ tracks, status });
  };

  return {
    mutate,
    mutateStatus,
    ...useMutationResult,
  }
}

export default useMutateTracks;