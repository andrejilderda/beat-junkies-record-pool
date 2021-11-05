import React, { ReactNode } from 'react';
import 'styled-components/macro';
import { Button } from '@mantine/core';

interface TrackButtonProps {
  isOn: boolean;
  onClick(): void;
  onIcon: ReactNode;
  offIcon: ReactNode;
  title?: string;
}

const TrackButton = ({
  isOn,
  onClick,
  onIcon,
  offIcon,
  ...rest
}: TrackButtonProps) => (
  <Button
    variant="link"
    css={`
      cursor: default;
      color: var(--gray-5);
      &:hover {
        color: var(--gray-3);
      }
    `}
    onClick={onClick}
    {...rest}
  >
    {isOn ? onIcon : offIcon}
  </Button>
);

export default TrackButton;
