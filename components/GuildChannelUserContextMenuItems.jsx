import React from 'react';
import { ContextMenu } from '@vizality/components';
import { open } from '@vizality/modal';
import { getModule } from '@vizality/webpack';

import MuteModal from './MuteModal';
import BlacklistModal from './BlacklistModal';
import MessageModal from './MessageModal';
import EmbedModal from './EmbedModal';

const { sendMessage } = getModule('sendMessage');

export default (props) => {
  const { user, channelId } = props;
  delete props.user;
  delete props.channelId;

  return (
    <>
      <ContextMenu.Separator />
      <ContextMenu.Group {...props}>
        <ContextMenu.Item
          id='vizality-moderator-tools'
          label='Vizality Moderator Tools'
        >
          <ContextMenu.Item
            id='vizality-moderator-tools-message'
            label={`Message ${user.username}`}
            color='colorDanger'
            action={() => open(() => <MessageModal
              targetName={user.username}
              targetType='user'
              targetId={user.id}
              sendMessage={(message) => sendMessage('765078263009247254', { content: message })}/>)}
          />
          <ContextMenu.Item
            id='vizality-moderator-tools-embed'
            label='Send Embed'
            color='colorDanger'
            action={() => open(() => <EmbedModal
              targetName={user.username}
              targetType='user'
              targetId={user.id}
              sendMessage={(message) => sendMessage('765078263009247254', { content: message })}/>)}
          />
          <ContextMenu.Separator />
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
          <ContextMenu.Separator />
          <ContextMenu.Item
            id='vizality-moderator-tools-blacklist'
            label={`Blacklist ${user.username}`}
            color='colorDanger'
            action={() => open(() => <BlacklistModal
              user={user}
              sendMessage={(message) => sendMessage(channelId, { content: message })}/>)}
          />
          <ContextMenu.Item
            id='vizality-moderator-tools-whitelist'
            label={`Whitelist ${user.username}`}
            color='colorDanger'
            action={() => sendMessage(channelId, { content: `;whitelist <@${user.id}>` })}
          />
        </ContextMenu.Item>
      </ContextMenu.Group>
    </>
  );
};
