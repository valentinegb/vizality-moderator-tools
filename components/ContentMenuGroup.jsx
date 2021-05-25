import React from 'react';
import { ContextMenu } from '@vizality/components';
import { open } from '@vizality/modal';
import { getModule } from '@vizality/webpack';

import MuteModal from './MuteModal';

const { sendMessage } = getModule('sendMessage');

export default (props) => {
  const { user, channelId } = props;
  delete props.user;

  return (
    <>
      <ContextMenu.Separator />
      <ContextMenu.Group {...props}>
        <ContextMenu.Item
          id='vizality-moderator-tools-mute'
          label={`Mute ${user.username}`}
          color='colorDanger'
          action={() => open(() => <MuteModal
            user={user}
            sendMessage={(message) => sendMessage(channelId, { content: message })}/>)}
        />
        <ContextMenu.Item
          id='vizality-moderator-tools-unmute'
          label={`Unmute ${user.username}`}
          color='colorDanger'
          action={() => sendMessage(channelId, { content: `;unmute <@${user.id}>` })}
        />
      </ContextMenu.Group>
    </>
  );
};
