import { Message, MessageEmbed } from 'discord.js';
import fetch, { Headers } from 'node-fetch';
import { Sequelize } from 'sequelize';
import messages from '../messages.json';
import Print from '../database/entities/prints';

class GetPrint {
  public static async main(msg: Message) {
    try {
      await Print.findOne({ order: [Sequelize.fn('RAND')] }).then(async (v) => {
        const creator = await this.getDiscordUser(v?.author as string);
        const authorData = (await creator.json()) || undefined; // prettier-ignore
        const embed = new MessageEmbed()
          .setColor(messages.bot.color)
          .setAuthor(
            authorData.message === 'Unknown User'
              ? 'Usuário desconhecido'
              : authorData?.username,
            authorData.message === 'Unknown User'
              ? messages.default_avatar
              : `https://cdn.discordapp.com/avatars/${authorData.id}/${authorData.avatar}.webp`,
          )
          .setFooter(messages.bot.name, messages.bot.avatar)
          .setDescription(v?.description as string)
          .setImage(v?.link as string);
        msg.reply(embed);
      });
    } catch (err) {
      msg.reply(err.message);
    }
  }

  public static async getDiscordUser(id: string) {
    return fetch(`https://discord.com/api/users/${id}`, {
      headers: new Headers({
        Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      }),
    });
  }
}

export default GetPrint;
