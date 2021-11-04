import React from 'react';
import styled from 'styled-components';
import { ColorScheme, ThemeIcon as MantineThemeIcon } from '@mantine/core';

interface ThemeProps {
  $palette: { [key: string]: string[] };
  $colorScheme: ColorScheme;
}

interface WrapperProps extends ThemeProps {
  selected: boolean;
  $isInQueue: boolean;
  $isReviewed: boolean;
}

export const Wrapper = styled.div<WrapperProps>`
  align-items: flex-start;
  border-radius: 4px;
  display: flex;
  flex: 1;
  padding: 8px;
  user-select: none;

  ${({ $isInQueue, $isReviewed, $palette }) => `
    ${($isInQueue || $isReviewed) && `
      > * { opacity: 0.3; }

      ${$isReviewed && `
        text-decoration: line-through;

        ${Title}, ${Artist} {
          opacity: 0.8;
        }`
      }
    `}
  `}

  &:hover {
    background: ${({ $colorScheme, $palette }) =>
      $colorScheme === 'dark'
        ? $palette.gray[8]
        : $palette.gray[1]
      };
  }

  ${({ selected, $colorScheme, $palette }) =>
    selected &&
    `
    &, &:hover {
      background: ${
        $colorScheme === 'dark'
        ? $palette.gray[7]
        : $palette.gray[2]
      };
    }`}
`;

export const PlayIcon = styled(MantineThemeIcon)`
  margin-right: 16px;
  align-self: center;
`;

export const Songwrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 0 33.33%;
`;

export const TrackButtonWrapper = styled.div`
  display: flex;
  margin-right: 12px;
  gap: 4px;
`;

export const Title = styled.div<ThemeProps & { $isPlaying: boolean }>`
  ${({ $isPlaying, $colorScheme, $palette }) =>
    $isPlaying && `
      color: ${$colorScheme === 'dark'
      ? $palette.green[5]
      : $palette.green[7]};
  `}
`;

export const Artist = styled.div`
  color: #999;
  font-size: 0.8rem;
`;

export const Genre = styled.div`
  color: #999;
  font-size: 0.8rem;
  flex: 1 0 33.33%;
`;

export const VersionWrapper = styled.div`
  color: #999;
  flex: 1 0 33.33%;

  ul {
    margin: 0;
    padding: 0;
  }
`;
