import React from 'react';
import { ContextMenu } from '@vizality/components';
import { open } from '@vizality/modal';
import { getModule } from '@vizality/webpack';

import MoveModal from './MoveModal';

const { sendMessage } = getModule('sendMessage');

export default (props) => {
  const { channel, message } = props;
  delete props.channel;
  delete props.message;

  return (
    <>
      <ContextMenu.Separator />
      <ContextMenu.Group {...props}>
        <ContextMenu.Item
          id='vizality-moderator-tools'
          label='Vizality Moderator Tools'
        >
          <ContextMenu.Item
            id='vizality-moderator-tools-move'
            label='Move Message'
            color='colorDanger'
            action={() => open(() => <MoveModal
              message={message.id}
              sendMessage={(message) => sendMessage(channel.id, { content: message })}/>)}
          />
        </ContextMenu.Item>
      </ContextMenu.Group>
    </>
  );
};
