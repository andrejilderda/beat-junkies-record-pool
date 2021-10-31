import React from 'react';
import styled from 'styled-components';
import { ThemeIcon as MantineThemeIcon } from '@mantine/core';

export const Wrapper = styled.div<{ selected: boolean }>`
  align-items: flex-start;
  border-radius: 4px;
  display: flex;
  flex: 1;
  padding: 8px;
  user-select: none;

  &:hover {
    background: var(--dark-7);
  }

  ${props => (props.selected ? `background: var(--dark-5);` : '')}
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
  margin-bottom: 0.25rem;
  ${({ $isPlaying }) => ($isPlaying ? `color: red;` : '')}
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
