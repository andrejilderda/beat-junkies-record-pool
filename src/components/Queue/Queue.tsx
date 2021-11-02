import React from 'react';
import {
  ActionIcon,
  Button,
  Code,
  Drawer,
  DrawerProps,
  Group,
  LoadingOverlay,
  Tooltip,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import 'styled-components/macro';
import { CrateItem } from '../../types';
import { ArchiveBox, Clipboard, Copy } from 'phosphor-react';
import { useClipboard } from '@mantine/hooks';
import useDb from '../../hooks/useDb';

interface QueueProps extends DrawerProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  queue: CrateItem[];
}

const Queue = ({ setOpen, queue, ...props }: QueueProps) => {
  const { colorScheme } = useMantineColorScheme();
  const {
    colors: { gray },
  } = useMantineTheme();
  const { copy, copied } = useClipboard();
  const { data, isLoading } = useDb([{ status: 'queue' }]);
  const downloadList = data?.map(
    item => `https://beatjunkies.com/download/?idattachment=${item.id}\n`,
  );

  return (
    <>
      <Drawer
        {...props}
        css={`
          margin: 0;
        `}
      >
        <LoadingOverlay
          visible={isLoading}
          overlayColor="rgba(0,0,0,0.5)"
          loaderProps={{ size: 'md', color: 'green' }}
        />
        <Group position="right">
          <Tooltip opened={copied} label="Copied!">
            <Button
              leftIcon={<Clipboard />}
              variant="filled"
              color="green"
              css={`
                margin-bottom: 12px;
              `}
              disabled={copied}
              onClick={() => copy(downloadList)}
            >
              Copy to clipboard
            </Button>
          </Tooltip>
        </Group>
        <Code
          block
          css={`
            background: ${colorScheme === 'dark' ? gray[8] : gray[1]};
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
