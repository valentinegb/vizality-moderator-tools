import { Plugin } from '@vizality/entities';
import { patch, unpatchAll } from '@vizality/patcher';
import { Guild } from '@vizality/constants';
import { getModule } from '@vizality/webpack';

import GuildChannelUserContextMenuItems from './components/GuildChannelUserContextMenuItems';
import ChannelListTextChannelContextMenuItems from './components/ChannelListTextChannelContextMenuItems';
import MessageContextMenuItems from './components/MessageContextMenuItems';

export default class VizalityModeratorTools extends Plugin {
  start () {
    this.injectStyles('styles.scss');

    patch(
      getModule(
        (m) => m.default?.displayName === 'GuildChannelUserContextMenu'
      ),
      'default',
      (args, res) => {
        const { channelId, guildId, user } = args[0];
        const guildThingy = getModule(m => m.default?.getGuild);

        if (
          guildId !== Guild.ID ||
          user.bot ||
          !getModule('canManageUser')
            .canManageUser(
              getModule('Permissions').Permissions.KICK_MEMBERS,
              user,
              getModule('useStateFromStores').useStateFromStores(
                [ guildThingy.default ],
                () => {
                  return guildThingy.default.getGuild(guildId);
                },
                [ guildId ]
              )
            )
        ) return res;

        const { children } = res?.props.children.props;

        children.splice(
          children.findIndex(value => value?.props?.children[0]?.props?.id === 'kick') + 1,
          0,
          GuildChannelUserContextMenuItems({ user, channelId })
        );
      }
    );

    patch(
      getModule(
        (m) => m.default?.displayName === 'ChannelListTextChannelContextMenu'
      ),
      'default',
      (args, res) => {
        const { channel } = args[0];

        if (channel.guild_id !== Guild.ID) return res;

        const { children } = res?.props;

        children.splice(
          children.findIndex(
            value => value?.props?.children[0]?.props?.id === 'invite-people'
          ) + 1,
          0,
          ChannelListTextChannelContextMenuItems({ channel })
        );
      }
    );

    patch(
      getModule(
        (m) => m.default?.displayName === 'MessageContextMenu'
      ),
      'default',
      (args, res) => {
        const { channel, message } = args[0];

        if (channel.guild_id !== Guild.ID) return res;

        const { children } = res?.props;

        children.splice(
          children.findIndex(
            value => value?.props?.children?.find(value => value?.props?.id === 'delete')
          ) + 1,
          0,
          MessageContextMenuItems({ channel, message })
        );
      }
    );
  }

  stop () {
    unpatchAll('vizality-moderator-tools');
  }
}
