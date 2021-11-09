import { useState } from 'react';
import H5AudioPlayer from 'react-h5-audio-player';
import { AudioPlayerTrack, CrateItem, HandleTrackChange, OnNextPrevTrackHandler } from '../types';

const useAudioPlayer = (playerRef: React.MutableRefObject<H5AudioPlayer | undefined>, filteredCrate: CrateItem[]) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioPlayerTrack, setAudioPlayerTrack] = useState<
    AudioPlayerTrack | undefined
  >(undefined);

  const onNextPrevTrackHandler: OnNextPrevTrackHandler = prevNext => {
    const trackIndex = filteredCrate.findIndex(
      item => item.id === audioPlayerTrack?.id,
    );
    const nextTrackId = prevNext === 'prev' ? trackIndex - 1 : trackIndex + 1;
    const nextTrack = filteredCrate[nextTrackId];
    if (!nextTrack) return;
    const { id, versions } = nextTrack;
    setAudioPlayerTrack({ id, version: versions[0] });
  };

  const handleTrackChange: HandleTrackChange = (e, track) => {
    if (audioPlayerTrack?.version === track.version) {
      playerRef.current?.togglePlay(e);
      setIsPlaying(prevState => !prevState);
    } else setAudioPlayerTrack(track);
  };

  return {
    isPlaying,
    setIsPlaying,
    audioPlayerTrack,
    onNextPrevTrackHandler,
    handleTrackChange
  }
}

export default useAudioPlayer;