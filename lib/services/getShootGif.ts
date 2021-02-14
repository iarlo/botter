import { Message, MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';
import messages from '../messages.json';

class GetShootGif {
  public static async main(msg: Message) {
    try {
      const mention = msg.mentions.users.first();
      if (!mention) throw new Error('Você deve mencionar um usuário.');
      if (mention.bot && mention.username === 'Botter') {
        return msg.reply('A bala ricocheteia e acerta no seu pé. 💅');
      }
      if (mention === msg.author) {
        const response = await this.fetchApiSuicide();
        const { results } = await response.json();
        const embed = new MessageEmbed()
          .setColor(messages.bot.color)
          .setAuthor(messages.bot.name, messages.bot.avatar)
          .setDescription(`${msg.author} cometeu suicídio 😭`)
          .setImage(
            results[0].media[0].gif.url
            || 'https://media.tenor.com/images/304a9c87f4729435a6aa3cd3a88f32cc/tenor.gif', // prettier-ignore
          );
        return msg.reply(embed);
      }
      const response = await this.fetchApi();
      const { results } = await response.json();
      const embed = new MessageEmbed()
        .setColor(messages.bot.color)
        .setAuthor(messages.bot.name, messages.bot.avatar)
        .setDescription(`${msg.author} matou ${mention} 🔫`)
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
      `https://g.tenor.com/v1/search?q=gun-shoot&key=${
        process.env.TENOR_KEY
      }&limit=1&pos=${Math.floor(Math.random() * (200 - 0 + 1)) + 0}`,
    );
  }

  public static fetchApiSuicide() {
    return fetch(
      `https://g.tenor.com/v1/search?q=suicide-gun&key=${
        process.env.TENOR_KEY
      }&limit=1&pos=${Math.floor(Math.random() * (100 - 0 + 1)) + 0}`,
    );
  }
}

export default GetShootGif;
