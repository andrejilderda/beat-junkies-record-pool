import React from 'react';
import { Playlist } from 'phosphor-react';
import { Group } from '@mantine/core';
import 'styled-components/macro';

const AppName = () => (
  <Group
    position="left"
    css={`
      font-family: 'Plus Jakarta Display';
      font-weight: 600;
      color: var(--gray-3);
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 0;
      padding-bottom: 0;
      padding-top: 0.25rem;
    `}
    withGutter
  >
    <>
      {/* This is the only component that uses Jakarta Display. TODO: Decide whether I want to keep this */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@xz/fonts@1/serve/plus-jakarta-display.min.css"
      ></link>
      <Playlist
        size={20}
        weight="regular"
        css={`
          margin-top: 2px;
        `}
      />
    </>
    <span>
      Beat Junkies{' '}
      <span
        css={`
          font-weight: 400;
          color: var(--gray-5);
        `}
      >
        Record Pool
      </span>
    </span>
  </Group>
);

export default AppName;
