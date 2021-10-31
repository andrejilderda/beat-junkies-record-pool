import React, { ReactNode } from 'react';
import { Button } from '@mantine/core';

interface TrackButtonProps {
  isOn: boolean;
  onClick(): void;
  onIcon: ReactNode;
  offIcon: ReactNode;
}

const TrackButton = ({ isOn, onClick, onIcon, offIcon }: TrackButtonProps) => {
  return (
    <Button variant="link" color="dark" onClick={() => onClick()}>
      {isOn ? onIcon : offIcon}
    </Button>
  );
};

export default TrackButton;
