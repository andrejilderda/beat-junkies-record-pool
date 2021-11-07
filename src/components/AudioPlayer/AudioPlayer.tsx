import styled from 'styled-components';
import AudioPlayer from 'react-h5-audio-player';

const StyledAudioPlayer = styled(AudioPlayer)`
  background: var(--gray-8);
  flex: 0;

  .rhap_time {
    color: var(--gray-2);
  }

  .rhap_controls-section {
    flex: 0;
  }

  .rhap_progress-filled {
    background: var(--gray-4);
  }

  .rhap_progress-indicator {
    display: none;
    box-shadow: none;
    background: var(--gray-2);
    box-shadow: none;
    height: 12px;
    top: -4px;
    width: 12px;
  }

  .rhap_progress-container:hover {
    .rhap_progress-filled {
      background: var(--green-8);
    }

    .rhap_progress-indicator {
      display: block;
    }
  }

  .rhap_progress-bar {
    background: var(--gray-7);
  }

  .rhap_download-progress {
    background: var(--gray-6);
  }
`;

export default StyledAudioPlayer;
