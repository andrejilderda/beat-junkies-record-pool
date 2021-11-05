import React from 'react';
import {
  ActionIcon,
  Code,
  Drawer,
  DrawerProps,
  Group,
  LoadingOverlay,
  Tooltip,
} from '@mantine/core';
import 'styled-components/macro';
import { CrateItem } from '../../types';
import { ArchiveBox, CheckCircle, Clipboard, X } from 'phosphor-react';
import { useClipboard } from '@mantine/hooks';
import useDb from '../../hooks/useDb';

interface QueueProps extends DrawerProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  queue: CrateItem[];
}

const Queue = ({ setOpen, queue, ...props }: QueueProps) => {
  const { copy, copied } = useClipboard();
  const { data, isLoading } = useDb([{ status: 'queue' }]);
  const downloadList = data?.map(
    item => `https://beatjunkies.com/download/?idattachment=${item.id}\n`,
  );

  return (
    <>
      <Drawer
        {...props}
        hideCloseButton={true}
        css={`
          margin: 0;
          color: var(--gray-0);
          font-weight: bold;
        `}
      >
        <LoadingOverlay
          visible={isLoading}
          overlayColor="var(--gray-9)"
          loaderProps={{ size: 'md' }}
        />
        <Group position="apart">
          <>Download Queue</>
          <Group spacing="xs">
            <Tooltip
              label="Copy to clipboard"
              disabled={copied}
              transition="pop"
            >
              <Tooltip opened={copied} label="Copied!" transition="pop">
                <ActionIcon
                  size="md"
                  color="gray"
                  onClick={() => copy(downloadList)}
                >
                  <Clipboard size={20} />
                </ActionIcon>
              </Tooltip>
            </Tooltip>
            <Tooltip label="Mark as downloaded" transition="pop">
              <ActionIcon size="md" color="gray">
                <CheckCircle weight="regular" size={20} />
              </ActionIcon>
            </Tooltip>
            <ActionIcon size="md" color="gray" onClick={() => setOpen(false)}>
              <X size={20} />
            </ActionIcon>
          </Group>
        </Group>
        <Code
          block
          css={`
            background: var(--gray-8);
            color: var(--gray-3);
            font-weight: normal;
            margin-top: 12px;
          `}
        >
          {downloadList}
        </Code>
      </Drawer>

      <ActionIcon size="lg" variant="filled" onClick={() => setOpen(true)}>
        <ArchiveBox size={20} />
      </ActionIcon>
    </>
  );
};

export default Queue;
