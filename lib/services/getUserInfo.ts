import { Message, MessageEmbed } from 'discord.js';
import messages from '../messages.json';

class GetUserInfo {
  public static main(msg: Message) {
    try {
      const mention = msg.mentions.members?.first();
      if (!mention) throw new Error(messages.error.notfound.replace('{{type}}', 'Usuário')); // prettier-ignore
      const embed = new MessageEmbed()
        .setColor(messages.bot.color)
        .setAuthor(messages.bot.name, messages.bot.avatar)
        .setImage(mention.user.avatarURL() as string);
      msg.reply(embed);
    } catch (err) {
      msg.reply(err.message);
    }
  }
}

export default GetUserInfo;
