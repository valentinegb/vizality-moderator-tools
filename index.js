import { Plugin } from '@vizality/entities';
import { patch, unpatchAll } from '@vizality/patcher';
import { getModule } from '@vizality/webpack';

import GuildChannelUserContextMenuItems from './components/GuildChannelUserContextMenuItems';

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
          guildId !== '689933814864150552' ||
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
  }

  stop () {
    unpatchAll('vizality-moderator-tools');
  }
}
