import React from 'react';
import styled from 'styled-components';
import { Badge as MantineBadge, ThemeIcon as MantineThemeIcon } from '@mantine/core';

interface WrapperProps {
  selected: boolean;
  $isInQueue: boolean;
  $isReviewed: boolean;
}

export const Wrapper = styled.div<WrapperProps>`
  align-items: flex-start;
  border-radius: 4px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 30px;
  padding: 8px;
  user-select: none;
  ${(props) => props.selected && `
    background: var(--gray-7);
  `}

  ${(props) => !props.selected && `
    &:hover {
      background: var(--gray-8);
    }

    &:hover ${Badge} {
      background: var(--gray-7);
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
  line-height: 1.85;
  font-size: 0.8rem;
`;

export const VersionWrapper = styled.div`
  color: var(--gray-5);

  ul {
    margin: 0;
    padding: 0;
  }
`;

export const Badge = styled(MantineBadge)`
  background: var(--gray-8);
  color: var(--gray-4);
  font-size: 11px;
  text-transform: none;

  svg {
    color: var(--gray-4);
  }

  &:hover {
    svg {
      color: var(--green-5);
    }
  }

  ${({$isPlaying}) => $isPlaying && `
   box-shadow: 0 0 0 1px var(--green-9);
   color: var(--gray-1);

   svg {
     color: var(--green-5);
   }
  `}

  ${({$selected}) => $selected && `
    background: var(--gray-6);
  `}


  & + & {
    margin-left: 8px;
  }

  button {
    cursor: default;
  }

  .mantine-Badge-leftSection {
    margin-right: 0;
  }

  .mantine-Badge-inner {
    margin-top: -1px;
  }
`

export const StyledSpotifyLogo = styled.a`
  cursor: default;
  color: var(--gray-5);
  display: block;

  &:hover {
    color: var(--green-6);
  }
`
