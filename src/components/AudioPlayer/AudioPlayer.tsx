import React, { useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import styled from 'styled-components';

export const StyledAudioPlayer = styled(AudioPlayer)`
  background: var(--dark-7);

  .rhap_controls-section {
    flex: 0;
  }
`;