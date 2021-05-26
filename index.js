import { Plugin } from '@vizality/entities';
import { patch, unpatchAll } from '@vizality/patcher';
import { Guild } from '@vizality/constants';
import { getModule, getModules } from '@vizality/webpack';

import GuildChannelUserContextMenuItems from './components/GuildChannelUserContextMenuItems';
import ChannelListTextChannelContextMenuItems from './components/ChannelListTextChannelContextMenuItems';

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

        res?.props.children.props.children.push(GuildChannelUserContextMenuItems({ user, channelId }));
      }
    );

    patch(
      getModules(
        (m) => m.default?.displayName === 'ChannelListTextChannelContextMenu'
      )[2],
      'default',
      (args, res) => {
        const { channel } = args[0];

        if (channel.guild_id !== Guild.ID) return res;

        res?.props.children.push(ChannelListTextChannelContextMenuItems({ channel }));
      }
    );
  }

  stop () {
    unpatchAll('vizality-moderator-tools');
  }
}
