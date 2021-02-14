import { Message, MessageEmbed } from 'discord.js';
import PlayerInfo from '../controllers/playerInfo';
import messages from '../messages.json';

class GetPlayerInfo {
  public static async main(msg: Message): Promise<any> {
    try {
      const nick = msg.content
        .slice(
          (msg.content.startsWith('/player') ? '/player' : '/jogador').length,
        )
        .trim()
        .toLowerCase()
        .split(' ');
      if (!nick[0].match(/\w{3,16}/g)) {
        return msg.reply(
          messages.error.invalid.replace('{{type}}', 'Nome de usuário'),
        );
      }
      const playerInfo = await PlayerInfo.getUser(nick[0]);
      // prettier-ignore
      const user = (await playerInfo.status) === 200 ? playerInfo.json() : undefined;
      if (!user) { throw new Error(messages.error.notfound.replace('{{type}}', 'Jogador')); } // prettier-ignore
      const { name, id: uuid } = await user;
      const nameHistoryInfo = await PlayerInfo.getNameHistory(uuid);
      const embed = new MessageEmbed()
        .setColor(messages.bot.color)
        .setAuthor(name, messages.player.head.replace('{{uuid}}', uuid))
        .setThumbnail(messages.player.body.replace('{{uuid}}', uuid))
        .addField(
          'Histórico de nomes',
          nameHistoryInfo.join('\n') || 'Histórico indisponível',
          true,
        )
        .setFooter(messages.bot.name, messages.bot.avatar);
      return msg.reply(embed);
    } catch (err) {
      return msg.reply(err.message);
    }
  }
}

export default GetPlayerInfo;
