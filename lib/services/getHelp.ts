import { Message, MessageEmbed } from 'discord.js';
import messages from '../messages.json';

class GetHelp {
  public static main(msg: Message) {
    try {
      const embed = new MessageEmbed()
        .setColor(messages.bot.color)
        .setAuthor(messages.bot.name, messages.bot.avatar)
        .addField(
          'Comandos',
          `\`\`\`ini\n${messages.bot.help.commands.join('\n')}\`\`\``,
          true,
        )
        .addField(
          'Funções',
          `\`\`\`${messages.bot.help.functions.join('\n')}\`\`\``,
          true,
        );
      msg.reply(embed);
    } catch (err) {
      msg.reply(err.message);
    }
  }
}

export default GetHelp;
