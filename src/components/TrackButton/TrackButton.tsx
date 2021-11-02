import React, { ReactNode } from 'react';
import 'styled-components/macro';
import { Button, useMantineColorScheme, useMantineTheme } from '@mantine/core';

interface TrackButtonProps {
  isOn: boolean;
  onClick(): void;
  onIcon: ReactNode;
  offIcon: ReactNode;
}

const TrackButton = ({ isOn, onClick, onIcon, offIcon }: TrackButtonProps) => {
  const { colorScheme } = useMantineColorScheme();
  const {
    colors: { gray },
  } = useMantineTheme();

  return (
    <Button
      variant="link"
      css={`
        color: ${colorScheme === 'dark' ? gray[5] : gray[5]};
        &:hover {
          color: ${colorScheme === 'dark' ? gray[3] : gray[7]};
        }
      `}
      onClick={onClick}
    >
      {isOn ? onIcon : offIcon}
    </Button>
  );
};

export default TrackButton;
