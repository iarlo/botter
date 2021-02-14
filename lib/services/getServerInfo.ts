import { Message, MessageEmbed } from 'discord.js';
import ServerInfo from '../controllers/serverInfo';
import messages from '../messages.json';

class GetServerInfo {
  public static async main(msg: Message): Promise<any> {
    try {
      const serverInfo = await (
        await ServerInfo.getServerInfo(messages.server.ip)
      ).json();
      const server = serverInfo.status ? serverInfo : undefined;
      if (!server) throw new Error(messages.error.notfound.replace('{{type}}', 'Servidor')); // prettier-ignore
      const embed = new MessageEmbed()
        .setColor(
          server.online
            ? messages.server.colors.on
            : messages.server.colors.off,
        )
        .setTitle(messages.server.title)
        .setAuthor(messages.bot.name, messages.bot.avatar)
        .setDescription(this.convertMOTD(server.description.extra))
        .setThumbnail(server.favicon)
        .addFields(
          {
            name: 'Status',
            value: server.online ? 'Online' : 'Offline',
            inline: true,
          },
          {
            name: 'Jogadores',
            value: `${server.players.online}/${server.players.max}`,
            inline: true,
          },
        );

      msg.reply(embed);
    } catch (err) {
      msg.reply(err.message);
    }
  }

  public static getRules(msg: Message) {
    try {
      const embed = new MessageEmbed()
        .setColor(messages.bot.color)
        .setTitle('Regras')
        .setAuthor(messages.bot.name, messages.bot.avatar)
        .setDescription(messages.server.rules.desc)
        .addField(
          'Lista de regras',
          messages.server.rules.list.join('\n'),
          false,
        );
      msg.reply(embed);
    } catch (err) {
      msg.reply(err.message);
    }
  }

  public static convertMOTD(
    motd: { bold?: boolean; color: string; text: string }[],
  ) {
    let discordText = '';
    for (let i = 0; i < motd.length; i += 1) {
      if (motd[i].bold) discordText += `**${motd[i].text}**`;
      discordText += motd[i].text;
    }
    return discordText;
  }
}

export default GetServerInfo;
