import useHotkeys from '@reecelucas/react-use-hotkeys';
import { SyntheticEvent } from 'react';
import H5AudioPlayer from 'react-h5-audio-player';
import useMutateTracks from '../../hooks/useMutateTracks';
import { useNotifications } from '@mantine/notifications';
import { CrateItem, OnNextPrevTrackHandler } from '../../types';
import { Check } from 'phosphor-react';
import { TrackMutation } from '../../hooks/useMutateTrack';

interface KeybindingsProps {
  playerRef: React.MutableRefObject<H5AudioPlayer | undefined>;
  selectAll(): void;
  clearSelection(): void;
  playPrevNextTrack: OnNextPrevTrackHandler;
  selection: CrateItem[];
}

const Keybindings = ({
  playerRef,
  selectAll,
  clearSelection,
  playPrevNextTrack,
  selection,
}: KeybindingsProps) => {
  const { mutateStatus } = useMutateTracks();
  const { showNotification: showMantineNotification } = useNotifications();
  const showNotification = (message: string) =>
    showMantineNotification({
      message: `${selection.length} ${
        selection.length > 1 ? 'items' : 'item'
      } ${message}.`,
      color: 'green',
      icon: <Check size={20} weight="bold" />,
      autoClose: 2000,
    });

  useHotkeys(['Control+a', 'Meta+a'], e => {
    e.preventDefault();
    selectAll();
  });

  useHotkeys(['Control+d', 'Meta+d', 'Escape'], e => {
    e.preventDefault();
    clearSelection();
  });

  useHotkeys(']', e => {
    e.preventDefault();
    playerRef.current?.handleClickForward();
  });

  useHotkeys('[', e => {
    e.preventDefault();
    playerRef.current?.handleClickRewind();
  });

  useHotkeys("' '", e => {
    playerRef.current?.togglePlay(e as unknown as SyntheticEvent);
    e.preventDefault();
  });

  useHotkeys(['Control+ArrowRight', 'Meta+ArrowRight'], e => {
    playPrevNextTrack('next');
    e.preventDefault();
  });

  useHotkeys(['Control+ArrowLeft', 'Meta+ArrowLeft'], e => {
    playPrevNextTrack('prev');
    e.preventDefault();
  });

  useHotkeys('q', e => {
    mutateStatus('queue', selection);
    showNotification('added to queue');
    e.preventDefault();
  });

  useHotkeys('r', e => {
    mutateStatus('reviewed', selection);
    showNotification('marked as reviewed');
    e.preventDefault();
  });

  useHotkeys('d', e => {
    mutateStatus('downloaded', selection);
    showNotification('marked as downloaded');
    e.preventDefault();
  });

  useHotkeys(['Control+Backspace', 'Meta+Backspace'], e => {
    mutateStatus('remove', selection);
    showNotification('reset');
    e.preventDefault();
  });

  return null;
};

export default Keybindings;
