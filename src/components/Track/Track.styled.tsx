import React from 'react';
import styled from 'styled-components';
import { ThemeIcon as MantineThemeIcon } from '@mantine/core';

interface WrapperProps {
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
  ${(props) => props.selected && `
    background: var(--gray-7);
  `}

  ${(props) => !props.selected && `
    &:hover {
      background: var(--gray-8);
    }
  `}

  ${({ $isInQueue, $isReviewed }) => `
    ${($isInQueue || $isReviewed) && `
      > * { opacity: 0.3; }

      ${$isReviewed && `
        color: var(--gray-3);
        text-decoration: line-through;

        ${Title}, ${Artist} {
          opacity: 0.8;
        }`
      }
    `}
  `}
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

export const Title = styled.div<{ $isPlaying: boolean }>`
  color: var(--gray-0);

  ${({ $isPlaying }) =>
    $isPlaying && `
      color: var(--green-5)

      [data-theme='light'] {
        color: var(--green-7)
      }
  `}
`;

export const Artist = styled.div`
  color: var(--gray-5);
  font-size: 0.8rem;
  `;

  export const Genre = styled.div`
  color: var(--gray-5);
  font-size: 0.8rem;
  flex: 1 0 33.33%;
  `;

  export const VersionWrapper = styled.div`
  color: var(--gray-5);
  flex: 1 0 33.33%;

  ul {
    margin: 0;
    padding: 0;
  }
`;
