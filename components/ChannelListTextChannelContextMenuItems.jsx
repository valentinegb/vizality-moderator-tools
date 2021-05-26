import React from 'react';
import { ContextMenu } from '@vizality/components';
import { open } from '@vizality/modal';
import { getModule } from '@vizality/webpack';

import SlowmodeModal from './SlowmodeModal';
import CleanModal from './CleanModal';

const { sendMessage } = getModule('sendMessage');

export default (props) => {
  const { channel } = props;
  delete props.channel;

  return (
    <>
      <ContextMenu.Separator />
      <ContextMenu.Group {...props}>
        <ContextMenu.Item
          id='vizality-moderator-tools'
          label='Vizality Moderator Tools'
        >
          <ContextMenu.Item
            id='vizality-moderator-tools-clean'
            label='Clean'
            color='colorDanger'
            action={() => open(() => <CleanModal
              channelName={channel.name}
              sendMessage={(message) => sendMessage(channel.id, { content: message })}/>)}
          />
          <ContextMenu.Item
            id='vizality-moderator-tools-slowmode'
            label='Set Slowmode'
            color='colorDanger'
            action={() => open(() => <SlowmodeModal
              channelName={channel.name}
              sendMessage={(message) => sendMessage(channel.id, { content: message })}/>)}
          />
        </ContextMenu.Item>
      </ContextMenu.Group>
    </>
  );
};
