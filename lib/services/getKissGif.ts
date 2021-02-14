import { Message, MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';
import messages from '../messages.json';

class GetKissGif {
  public static async main(msg: Message) {
    try {
      const mention = msg.mentions.users.first();
      if (!mention) throw new Error('Você deve mencionar um usuário.');
      if (mention.bot && mention.username === 'Botter') {
        return msg.reply(
          messages.bot.kiss[
            Math.floor(Math.random() * messages.bot.kiss.length)
          ],
        );
      }
      const response = await this.fetchApi();
      const { results } = await response.json();
      const embed = new MessageEmbed()
        .setColor(messages.bot.color)
        .setAuthor(messages.bot.name, messages.bot.avatar)
        .setDescription(`${msg.author} beijou ${mention}`)
        .setImage(
          results[0].media[0].gif.url
            || 'https://media.tenor.com/images/304a9c87f4729435a6aa3cd3a88f32cc/tenor.gif', // prettier-ignore
        );
      return msg.reply(embed);
    } catch (err) {
      return msg.reply(err.message);
    }
  }

  public static fetchApi() {
    return fetch(
      `https://g.tenor.com/v1/search?q=anime-kiss&key=${
        process.env.TENOR_KEY
      }&limit=1&pos=${Math.floor(Math.random() * (1000 - 0 + 1)) + 0}`,
    );
  }
}

export default GetKissGif;
