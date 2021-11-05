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
import { ArchiveBox, Check, CheckCircle, Clipboard, X } from 'phosphor-react';
import { useClipboard } from '@mantine/hooks';
import { useNotifications } from '@mantine/notifications';
import useDb from '../../hooks/useDb';
import useMutateTracks from '../../hooks/useMutateTracks';

interface QueueProps extends DrawerProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  queue: CrateItem[];
}

const Queue = ({ setOpen, queue, ...props }: QueueProps) => {
  const { showNotification } = useNotifications();
  const { copy, copied } = useClipboard();
  const { data, isLoading } = useDb([{ status: 'queue' }]);
  const { mutate } = useMutateTracks();
  const hasItemsInQueue = !!data?.length;
  const downloadList =
    data
      ?.map(
        item => `https://beatjunkies.com/download/?idattachment=${item.id}\n`,
      )
      .join('') ||
    'The download queue is empty. \nClick the + to add items to the queue.';

  const handleMarkAsDownloadedClick = () => {
    if (data?.length) {
      setOpen(false);
      showNotification({
        message: `${data.length} ${
          data.length > 1 ? 'items' : 'item'
        } marked as downloaded`,
        color: 'green',
        icon: <Check size={20} weight="bold" />,
        autoClose: 2000,
      });
      mutate({ tracks: data, status: 'downloaded' });
    }
  };

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
            <>
              {hasItemsInQueue && (
                <>
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
                    <ActionIcon
                      size="md"
                      color="gray"
                      onClick={handleMarkAsDownloadedClick}
                    >
                      <CheckCircle weight="regular" size={20} />
                    </ActionIcon>
                  </Tooltip>
                </>
              )}
            </>
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
