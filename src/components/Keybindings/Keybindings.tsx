import useHotkeys from '@reecelucas/react-use-hotkeys';
import { SyntheticEvent } from 'react';
import H5AudioPlayer from 'react-h5-audio-player';

interface KeybindingsProps {
  playerRef: React.MutableRefObject<H5AudioPlayer | undefined>;
  selectAll(): void;
  clearSelection(): void;
}

const Keybindings = ({
  playerRef,
  selectAll,
  clearSelection,
}: KeybindingsProps) => {
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

  return null;
};

export default Keybindings;
