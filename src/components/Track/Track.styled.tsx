import React from 'react';
import styled from 'styled-components';
import { ThemeIcon as MantineThemeIcon } from '@mantine/core';

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
  margin: 8px 0;
`

export const PlayIcon = styled(MantineThemeIcon)`
  margin-right: 12px;
  align-self: center;
`

export const Songwrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 33.33%;
`

export const Title = styled.div``;

export const Artist = styled.div`
  color: #999;
`

export const Genre = styled.div`
  color: #999;
  flex: 1 0 33.33%;
`

export const VersionWrapper = styled.div`
  color: #999;
  flex: 1 0 33.33%;

  ul {
    margin: 0;
    padding: 0;
  }
`
